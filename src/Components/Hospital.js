import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../App.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

class Hospital extends Component {
  constructor(props) {
    super();
    this.state = ({
      hospitalData: [
        {
          name: "Bệnh viện bạch mai",
          account: "0x3179a9844dB47093Aa0e9F0D4032e98b7ea3295E"
        },
        {
          name: "Bệnh viện thanh nhàn",
          account: "0x1098a13C8893679559F06cD18A41e883F97a060f"
        },
        {
          name: "Bệnh viện Tai Mũi Họng",
          account: "0xacc560Ada4757D152aD532C2D1950EdB6D1ccdcc"
        },
        {
          name: "Bệnh viện nhi trung ương",
          account: "0xEF09BcbaE5B7EEB61e498E7Bafb9B047Bc79548b"
        },
        {
          name: "Bệnh viện mắt",
          account: "0xFC382C561693f973B91dFc127F89fA2335B2e6b2"
        },
        {
          name: "Bệnh viện nội tiết",
          account: "0xE629062079955C7b066Da86686DEA80D031eF194"
        },
        {
          name: "Bệnh viện da liễu ",
          account: "0xa92D11023222F2f6c689c0Fc285F67e378E2A1Ed"
        },
        {
          name: "Bệnh viện việt đức",
          account: "0xf32e9844fC861297b99EE3B8B8E9b17D8CCE230D"
        },
        {
          name: "Bệnh viện việt pháp",
          account: "0xEB37339101Dca901F3C27FF07d626b34e715fBf3"
        },
        {
          name: "Bệnh viện bách khoa",
          account: "0x42c946b2a1E1cBc97b7423Fb3B19c02923470f8c"
        }
      ]
    })
  }


  setToHospital = (account, name) => {
    let a = window.confirm("You definitely moved to" + name + "?");
    if (a) {
      this.props.setToHospital(name, account);
    }

  }


  render() {
    let a = 0;
    return (
      <div>
        <div className="bodertitle" style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
          <span><h3>Danh sách bệnh viện</h3></span>
        </div>
        <div className="bodercontent patientmargintop">
          <ul className="stylehospital ">
            {this.state.hospitalData.map(item => {
              a++;
              return (<li className="input2">
                <a onClick={event => this.setToHospital(item.account, item.name)} ><span>{a}</span>: {item.name}</a>
                <hr />
              </li>)
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Hospital;