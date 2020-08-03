import React, { Component } from 'react';

class Patient extends Component {
  constructor(props) {
    super();

  }

  getSickCode = (id) => {
    console.log(id);
    this.props.getSickbypatient(id);

  }
  getRecordMedecal = (id, sickCode) => {


    this.props.getRecordMedecal(id, sickCode);
  }

  render() {
    let a = 0;
    return (
      <div className="col-md-3">
        <div className="bodertitle" style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
          <span><h3> Danh sách hồ sơ bệnh </h3></span>
          <span className="pull-right-container">
          </span>
        </div>
        <div className="bodercontent headerMarginTopMedical">
          <ul className="stylehospital">
            {
              this.props.sickCodeByPatient.map((data) => {
                a++;
                return (<li className="input2">
                  <a onClick={event => this.getRecordMedecal(this.props.patient.id[0], data.sickCode)}> <span>{a}</span>: {data.name}</a>
                  <hr />
                </li>)
              }
              )
            }

          </ul>
        </div>
      </div>
    )
  }
}

export default Patient;