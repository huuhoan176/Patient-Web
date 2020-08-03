import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';



export default class SideBar extends Component {


  constructor(props) {
    super()
    this.state = ({
      nameAccounts: "Bệnh viện bạch mai",
      src: "img/bvbachmai.png"

    })
    let web3 = window.web3;
    this.web3 = new Web3(web3.currentProvider);
  }
  componentDidMount = async () => {
    let nameAccounts = "";
    let src = "" ;
    console.log("day la web3 js : " + this.web3.eth.accounts[0])
    let account = await this.web3.eth.accounts[0]
    let account1 = await this.web3.toChecksumAddress(account);
    switch (account1) {
      case "0x3179a9844dB47093Aa0e9F0D4032e98b7ea3295E":
        {
          nameAccounts = "Bệnh viện bạch mai";
          src = "img/bvbachmai.png";
        }

        break;
      case "0x1098a13C8893679559F06cD18A41e883F97a060f":
        {
          nameAccounts = "Bệnh viện thanh nhàn";
          src = "img/hospital.jpg";
        }
        break;
      case "0xacc560Ada4757D152aD532C2D1950EdB6D1ccdcc":
        {
          nameAccounts = "Bệnh viện tai mũi họng";
          src = "img/hospital.jpg";
        }
        break;
      case "0x17612A043C6F48CdE4AB95Bbf3710Ce11BAbd66c":
        {
          nameAccounts = "Bệnh viện nhi trung ương";
          src = "img/hospital.jpg";
        }
        break;
      case "0x0a88BAa64ea54a3257C76170791E70d06D869FD2":
        {
          nameAccounts = "Bệnh viện mắt";
          src = "img/hospital.jpg";
        }
        break;
      case "0x6b910CAdC7D49c24aE7B2D23d09A5278e360A72e":
        {
          nameAccounts = "Bệnh viện nội tiết";
          src = "img/hospital.jpg";
        }
        break;
      case "0xb747aEAf9125b23bacbCD5Ff491486C6e520F418":
        {
          nameAccounts = "Bệnh viện da liễu";
          src = "img/hospital.jpg";
        }
        break;
      case "0x1265f5447339E91e8ab6854287842012f7928803":
        {
          nameAccounts = "Bệnh viện việt đức";
          src = "img/hospital.jpg";
        }
        break;
      case "0x93D9829241438Be9AC83378256Fe1454d54801D1":
        {
          nameAccounts = "Bệnh viện việt pháp";
          src = "img/hospital.jpg";
        }
        break;
      case "0x191d6AC3B818A53c6cAD7825Eb317980790c66bF":
        {
          nameAccounts = "Bệnh viện bách khoa";
          src = "img/hospital.jpg";
        }
        break;
      default:
        {
          nameAccounts = "Bệnh nhân ";
          src = "img/hospital.jpg";
        }
    }
    this.setState({
      nameAccounts, src

    })

  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src={this.state.src} className="img-circle" alt="User Image" />
            </div>
            <div className="pull-left info">

              <p>{this.state.nameAccounts}</p>
              <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN NAVIGATION</li>
            <li>
              <Link to='/'>
                <i className="fa fa-files-o"></i>
                <span>Danh sách bệnh nhân</span>
                <span className="pull-right-container">
                </span>
              </Link>

            </li>
            <li>
              <Link to='/createPatient'>
                <i className="fa fa-files-o"></i>
                <span>Khởi tạo thông tin bệnh nhân</span>
                <span className="pull-right-container">
                </span>
              </Link>
            </li>
            <li>
              <Link to='/sendPatient'>

                <i className="fa fa-th">
                </i> <span>Chuyển bệnh nhân</span>
                <span className="pull-right-container">
                </span>
              </Link>
            </li>
            <li>
              <Link to='/InitMedical'>

                <i className="fa fa-th">
                </i> <span>Tạo hồ sơ bệnh nhân</span>
                <span className="pull-right-container">
                </span>
              </Link>
            </li>
            {/* <li className="treeview">
              <a href="#">
                <i className="fa fa-pie-chart"></i>
                <span>Charts</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/charts/chartjs.html"><i className="fa fa-circle-o"></i> ChartJS</a></li>
                <li><a href="pages/charts/morris.html"><i className="fa fa-circle-o"></i> Morris</a></li>
                <li><a href="pages/charts/flot.html"><i className="fa fa-circle-o"></i> Flot</a></li>
                <li><a href="pages/charts/inline.html"><i className="fa fa-circle-o"></i> Inline charts</a></li>
              </ul>
            </li>
            <li>
              <ul className="treeview-menu">
                <li><a href="pages/tables/simple.html"><i className="fa fa-circle-o"></i> Simple tables</a></li>
                <li><a href="pages/tables/data.html"><i className="fa fa-circle-o"></i> Data tables</a></li>
              </ul>
            </li> */}
          </ul>
        </section>
      </aside>
    )
  }
}