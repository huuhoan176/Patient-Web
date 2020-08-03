import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import Medical from './build/contracts/Medical.json';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import 'react-sticky-header/styles.css';
import SideBar from './Components/SideBar';
import Content from './Components/Content';
import { type } from 'os';
import ContentSendPatient from './Components/ContentSendPatient';
import { Route, Switch } from 'react-router-dom';
import CreatePatient from './Components/CreactPatient';
import InitMedical from './Components/InitMedical';
import $ from 'jquery'

class App extends Component {
  constructor() {
    super();
    this.isWeb3 = true;
    this.isWeb3Locked = false;
    this.appName = "Patient Data";

    this.state = {
      network: "checking...",
      accounts: null,//address , nhưng các ký tự bị chuyển thành chữ thường 
      CurrentAccountChecksumed: null,//cùng giá trị với accounts , nhưng đã được checksum 
      medicalContract: null,
      patientData: [],
      sickCodes: [],//show ra cac ban ghi benh cua tat ca cac patient cua user
      sickCodeByPatient: [],//show cac benh cua 1 patient.
      sickDataAll: [], //  tat cac benh trong contract 
      recordMedical: [],// by patient + sickCode
      keyComponentRender: 0,
      patientCurent: null, // bệnh nhân đang  được lưa chọn 
      currentPatientAndSick: {},
      searchData: [],
      isSearch: false
    };
    this.loadWeb3()

  }

  loadWeb3 = async () => {
    window.ethereum.enable()
    let web3 = window.web3;
    if (typeof web3 !== "undefined") {
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);
      // const medicalJson = await $.getJSON('./build/contracts/Medical.json')
      this.medicalContract = TruffleContract(Medical);
      this.medicalContract.setProvider(this.web3Provider);
      this.deployedC = await this.medicalContract.deployed()
      // console.log(deployed)
      if (web3.eth.coinbase === null)
        this.isWeb3Locked = true;
    } else {

      this.isWeb3 = false;
    }
  }

  setNetwork = () => {
    let networkName,
      that = this;

    this.web3.version.getNetwork(function (err, networkId) {
      switch (networkId) {
        case "1":
          networkName = "Main";
          break;
        case "2":
          networkName = "Morden";
          break;
        case "3":
          networkName = "Ropsten";
          break;
        case "4":
          networkName = "Rinkeby";
          break;
        case "42":
          networkName = "Kovan";
          break;
        default:
          networkName = networkId;
      }
      that.setState({
        network: networkName
      })
    });
  };

  getPatientData = () => {
    let app = this;

    this.medicalContract.deployed().then(function (instance) {
      let patientdt = instance;
      let patientData = []
      let sickCodes = []
      let sickDataAll = []
      instance.getPatientByOwner(app.state.accounts).then(function (ids) {
        console.log("ids:" + ids + " type : " + typeof (ids));
        console.log({ ids })
        if (ids)
          for (let id of ids) {
            //  let x = id ; 
            patientdt.patients(id).then(function (data) {
              patientData.push(data);
              app.setState({
                patientData
              });
            }, 100);
            patientdt.viewSickCode(id).then(function (data1) {// get sickcode của tất cả patient của owner
              let idpatient1 = id.toNumber();
              data1 = data1.map(x => x.toNumber());
              data1 = data1.filter(code => code !== 0)
              console.log(idpatient1 + typeof (idpatient1) + typeof (data1) + data1);
              // console.log("day la so " + typeof(0) +  " so : " +idpatient1 );
              sickCodes.push({ idpatient1, data1 })
              app.setState({
                sickCodes
              });
              console.log("ban ghi sick code " + idpatient1 + data1)
            })
          }
      }).catch(error => { console.log(error) })
      instance._countSick().then(function (count) { // đếm số bệnh đang có trên hệ thống blockchain
        console.log("sick all " + count);
        if (count)
          for (let id = 0; id < count; id++) {
            patientdt.sicks(id).then(function (data) {
              let name = data[0];
              let sickCode = data[1].toNumber();
              // let sickDataAll = app.state.sickDataAll;
              console.log({ name, sickCode })

              sickDataAll.push({ name, sickCode });
              // console.log("sck " + sic)
              app.setState({
                sickDataAll
              });

            })
          }
      })
    })
  }

  componentDidMount = async () => {
    try {
      this.setNetwork();

      const accounts = this.web3.eth.accounts[0];
      console.log("account is :" + accounts);
      this.setState({
        accounts
      })
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.log("error to doko");
      console.error(err);
    }

    this.getPatientData()
  }

  getSickbypatient = (patientID) => {
    let app = this;
    // console.log(this.state.sickCodes[0])
    let sickCodes = this.state.sickCodes;
    console.log("id = 0 :" + sickCodes[0])
    sickCodes.forEach(function (x) {
      if (x.idpatient1 == patientID) {
        console.log("data" + x.data1);

        let sickCodeByPatient = [];
        let sickDataAll = app.state.sickDataAll;
        for (let data of x.data1) {
          console.log("dem cai nay xem may cai" + data)
          for (let sickdata of sickDataAll) {
            if (data == sickdata.sickCode) {
              sickCodeByPatient.push(sickdata);
              console.log(sickdata);
            }
          }
        }
        app.setState({
          sickCodeByPatient
        })
      }
    });
    app.setState({ recordMedical: [] })
    console.log("day la cai xem " + app.state.sickCodeByPatient[0]);
  }

  getRecordMedecal = async (idPatient, sickCode) => {
    console.log("ids getRecordMedical: ", { idPatient, sickCode })
    let app = this;
    let recordMedical = [];
    //ghi nhớ lại dữ liệu của bệnh nhân và bệnh đang gọi để sau này tạo recordMedical theo dữ liệu này 
    this.setState({
      currentPatientAndSick: { idPatient, sickCode }
    })
    this.medicalContract.deployed().then((instance) => {
      let contract = instance;
      instance.getRecordMedical(idPatient, sickCode).then(async (ids) => {
        console.log("ids getRecordMedical: " + ids)
        for (let id of ids) {
          await contract.medicalExaminations(id).then((data) => { // do cơ chế bất đồng bộ của vòng lặp for . nên phải dùng await để  đồng bộ 
            let number = data[0].toNumber();
            let realTime = this.convertNumberToRealTime(number);
            console.log("id : " + id + " number: " + number + "ban goc kem " + data[1])
            let description = data[1];
            recordMedical.push({ realTime, description });
            console.log(data[0].toNumber() + "ban goc o app.js" + recordMedical);
            app.setState({
              recordMedical
            });
          })
          // app.setState({
          //     recordMedical
          //   });
        }
      }).catch((error) => {
        console.log(error)
        app.setState({ recordMedical })
        alert("Không tìm thấy bệnh án!");
      })
    })
  }

  convertNumberToRealTime = (number) => {
    let d = new Date();
    d.setTime(number * 1000);
    let dateString = d.toUTCString();  // or d.toString if local time required
    alert(dateString);
    return dateString;

  }
  setPatientCurrent = (id) => {
    this.setState({
      patientCurent: id[0]
    })
    console.log(id[0])
  }

  setToHospital = (name, account) => { // gửi bệnh nhân tới bệnh viện đã chọn
    console.log("di chet di" + account);
    let patientID = this.state.patientCurent;
    let userAccount = this.state.accounts;
    let userAccount1 = this.web3.toChecksumAddress(userAccount);
    console.log("account" + userAccount + " , id " + patientID);
    // let account1 = account.toLowerCase(); 
    console.log("from : " + userAccount1 + ",   to : " + account);
    this.medicalContract.deployed().then((instance) => {
      instance.transferFrom(userAccount, account, patientID, { from: userAccount, gas: 6666666, value: 0, gasPrice: 20 }).then((response) => {

        alert("patient transferred to : " + name);
        this.getPatientData()
      }).catch((error) => {
        console.log("error cmnr " + error)
      })
    })
  }

  createPatient = (name, cmt, age, gender) => { //khởi tạo thông tin bệnh nhân với thông tin cơ bản 
    let userAccount = this.web3.eth.accounts[0];
    // this.medicalContract.deployed().then((instance) => {
    this.deployedC.CreatePatient(name, cmt, age, gender, { from: userAccount, gas: 6666666 }).then((response, error) => {
      if (response) {
        alert("More successful patients ")
        this.getPatientData()
      }
      else {
        console.log("error:" + error);
        // console.log("error" + error);
      }
    })
    // })
  }

  createMedical = (RecordData) => {
    let userAccount = this.web3.eth.accounts[0];
    let { idPatient, sickCode } = this.state.currentPatientAndSick;
    console.log("dang o day roi " + "id patient:" + idPatient + "sickcode:" + sickCode + RecordData)

    //   alert("không thành công")
    //   return 
    // }
    this.medicalContract.deployed().then((instance) => {
      instance.RecordMedical(idPatient, sickCode, RecordData, { from: userAccount }).then((response, error) => {
        if (response) {
          alert("More successful Record medical ")
          this.getPatientData()
        }
        else {
          alert("error:" + error);
          // console.log("error" + error);
        }
      })
    })

  }

  setPatientToSick = (name, sickCode) => {// tạo hồ sơ bệnh án cho bệnh nhân 
    console.log("di chet di" + name);
    let patientID = this.state.patientCurent;
    let userAccount = this.state.accounts;
    this.medicalContract.deployed().then((instance) => {
      instance._setPatientSick(patientID, sickCode, { from: userAccount }).then((response) => {

        alert("đã tạo hồ sơ bệnh nhân mắc bệnh " + name);
        this.getPatientData()
      }).catch((error) => {
        console.log("error cmnr " + error)
      })
    })

  }

  onInputSearch = (keySearch) => {
    const { patientData } = this.state;
    let format = keySearch.charAt(0).toUpperCase() + keySearch.slice(1)
    console.log({format})
    let isSearch = true
    let resultsSearch = patientData.filter(p => {
      let name = p[1]
      let cmt = p[2]
      console.log(name.includes(keySearch))
      console.log({ name })
      return name.includes(keySearch) || name.includes(format) || cmt.includes(keySearch)
    })
    if (!keySearch) {
      resultsSearch = patientData
      isSearch = false
    }
    this.setState({ searchData: resultsSearch, isSearch })
  }

  render() {
    const { patientData, searchData, isSearch } = this.state;
    if (this.isWeb3) {
      if (this.isWeb3Locked) {
        return (
          <div>
            <Header network={this.state.network} appName={this.appName} />
            <SideBar patientData={this.state.patientData} />
            <Content message="Unlock Your Metamask/Mist Wallet" />
          </div>)
      } else {
        return (
          <div>
            <Header network={this.state.network} appName={this.appName} />
            <SideBar patientData={this.state.patientData} />
            <Switch>
              <Route exact path='/' render={(props) =>
                <Content
                  getSickbypatient={this.getSickbypatient}
                  patientData={isSearch ? searchData : patientData}
                  sickCodeByPatient={this.state.sickCodeByPatient}
                  sickDataAll={this.state.sickDataAll}
                  getRecordMedecal={this.getRecordMedecal}
                  recordMedical={this.state.recordMedical}
                  createMedical={this.createMedical}
                  onSearch={this.onInputSearch} />
              } />
              <Route path='/createPatient' render={(props) => <CreatePatient createPatient={this.createPatient} />} />
              <Route path='/sendPatient' render={(props) => <ContentSendPatient CurrentAccountChecksumed={this.state.CurrentAccountChecksumed} patientData={this.state.patientData}
                setPatientCurrent={this.setPatientCurrent} setToHospital={this.setToHospital} />} />
              <Route path='/InitMedical' render={(props) => <InitMedical setPatientToSick={this.setPatientToSick} patientData={this.state.patientData} sickDataAll={this.state.sickDataAll}
                setPatientCurrent={this.setPatientCurrent} />} />
            </Switch>
          </div>)
      }
    } else {
      return (
        <div className="App">
          <Header />
        </div>
      );
    }
  }
}

export default App;
