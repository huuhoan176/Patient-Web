import React, { Component } from 'react';
import Hospital from './Hospital';
import UserProfile from './userProfile';

export default class ContentSendPatient extends Component {

  constructor(props) {
    super();
    this.state = {
      PatientDetail: { name: "nonane", cmt: "no number", age: 0, sex: 0, live: false }
    }
  }

  handlSetPatientTransport = (id) => {
    this.props.patientData.map((data) => {
      if (data[0].c === id) {
        let name = data[1];
        let cmt = data[2];
        let age = data[3].toNumber();
        let gender = data[4].toNumber();
        let sex;
        if (gender === 1) sex = "Male"
        else if (gender === 2) sex = "Female"
        else sex = "other"
        this.setState({
          PatientDetail: { name, cmt, age, sex, live: 0 }

        })
        console.log("data" + data + typeof (data));
      }
    })
    this.props.setPatientCurrent(id);
    console.log(id + "show ra rooi" + this.state.PatientDetail)

  }

  render() {
    let a = 0;
    return (
      <div className=" contentlayout content-wrapper">
        <section className="content-header headerMarginTop">
          <div className="row titleBackgr">
            <h2>Chuyển viện </h2>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="bodertitle" style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                <span><h3>Danh sách bệnh nhân</h3></span>
              </div>
              <div className="bodercontent patientmargintop">
                <ul className="stylehospital">
                  {
                    this.props.patientData.map((data) => {
                      a++;
                      return (<li className="input2">
                        <a onClick={event => this.handlSetPatientTransport(data[0].c)} > <span>{a}</span>:{data[1]}</a>
                        <hr />
                      </li>)
                    }
                    )
                  }
                </ul>
              </div>

            </div>
            <div className="col-md-3">
              <div className="bodertitle" style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
                <span><h3>Thông tin bệnh nhân</h3></span>
              </div>
              <div className=" patientmargintop">
                <UserProfile PatientDetail={this.state.PatientDetail} />
              </div>
            </div>
            <div className="col-md-3">
              <Hospital CurrentAccountChecksumed={this.props.CurrentAccountChecksumed} setToHospital={this.props.setToHospital} />
            </div>
          </div>
        </section>
      </div>
    )
  }
}
