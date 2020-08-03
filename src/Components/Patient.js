import React, { Component } from 'react';

class Patient extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }

  getSickCode = (id, name, cmt, age, gender) => {
    console.log(id);
    this.props.getSickbypatient(id);
    this.props.setSickShowByPatient({ id, name, cmt, age, gender });

  }

  render() {
    let a = 0;
    return (
      <div className="col-md-3">
        <div className="bodertitle" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <h3>Danh sách bệnh nhân</h3>
        </div>
        <div className="bodercontent patientmargintop">
          <ul className="stylehospital ">
            {
              this.props.patientData.map((data) => {
                a++;

                return (<li className="input2">
                  <a onClick={event => this.getSickCode(data[0].c, data[1], data[2], data[3].c, data[4].c)} > <span>{a}</span>: {data[1]}</a>
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