import React, { Component } from 'react';
import ListSickAll from './ListSickAll';
import UserProfile from './userProfile';

class InitMedical extends Component {
  constructor(props) {
    super();
    this.state = {
      PatientDetail: { name: "", cmt: "", age: '', sex: '', live: false }
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
        if (gender === 1) sex = "Nam"
        else if (gender === 2) sex = "Nữ"
        else sex = "Khác"
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
      <div className=" contentlayout content-wrapper " >
        <section className="content-header headerMarginTop">
          <div className="row titleBackgr" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <h3>Tạo hồ sơ bệnh nhân</h3>
          </div>
          <div className="row">
            <div className="col-md-3">

              <div className="bodertitle" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <span><h3>Danh sách bệnh nhân</h3></span>
              </div>
              <div className="bodercontent patientmargintop">
                <ul className="stylehospital">
                  {
                    this.props.patientData.map((data) => {
                      a++;
                      return (
                        <li className="input2">
                          <a onClick={event => this.handlSetPatientTransport(data[0].c)} ><span>{a}</span>: {data[1]}</a>
                          <hr />
                        </li>)
                    })
                  }
                </ul>
              </div>

            </div>
            <div className="col-md-3">
              <div className="bodertitle" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <span><h3>Thông tin bệnh nhân </h3></span>
              </div>
              <div className=" patientmargintop">
                <UserProfile PatientDetail={this.state.PatientDetail} />
              </div>
            </div>
            <div className="col-md-3">
              <ListSickAll setPatientToSick={this.props.setPatientToSick} sickDataAll={this.props.sickDataAll} />
            </div>
          </div>
        </section>
      </div >
    )
  }
}

export default InitMedical;