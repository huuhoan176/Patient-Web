// const Web3 = require('web3');
// const TruffleContract = require('truffle-contract');
// const Medical = require('../build/contracts/Medical.json');

// (async function () {
//   console.log('TEST')
//   const address = '0x062041B7d673d07db28eAb06B3423871Fff3A900'

//   let web3 = new Web3('http://127.0.0.1:7545')
//   if (typeof web3 !== "undefined") {
//     // this.web3Provider = web3.currentProvider;
//     // this.web3 = new Web3(web3.currentProvider);
//     // const medicalJson = await $.getJSON('./build/contracts/Medical.json')
//     this.medicalContract = TruffleContract(Medical);
//     this.medicalContract.setProvider(web3.currentProvider);
//     // const deployed = await this.medicalContract.deployed()
//     // console.log(deployed)
//     if (web3.eth.coinbase === null)
//       this.isWeb3Locked = true;
//     console.log('isWeb3Locked true')
//   } else {
//     console.log('isWeb3 false')
//     this.isWeb3 = false;
//   }

//   createPatient = (name, cmt, age, gender) => { //khởi tạo thông tin bệnh nhân với thông tin cơ bản 

//     this.medicalContract.deployed().then((instance) => {
//       instance.CreatePatient(name, cmt, age, gender, { from: address, gas: 7666666 }).then((response, error) => {
//         if (response) {
//           console.log({ response })
//         }
//         else {
//           console.log("error de:" + error);
//         }
//       })
//     }).catch(error => {
//       console.log('catch deployed', error)
//     })
//   }

//   createPatient('thanh', 50666, 25, 1)

// })()

// // smart contract address
// // Patient:0x7B7AC77dd1470211D2AE074be7568bF034b625Cb
// // Sick:0xc2FA571140029a0F75C880FD8Eaf169006244A3E
// // SetSick:0xcb016B0BF714271FB37CCC3943792719ea74c9A6
// // Medical:0xff70943C3B6Ea6698a47dbE0Efabb0F72e3D9bC3