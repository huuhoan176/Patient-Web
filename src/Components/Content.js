import React, { Component } from 'react';
import Patient from './Patient';
import Sick from './Sick';
import RecordMedical from './RecordMedical';
import CreateMedical from './CreateMedical';


export default class Content extends Component {
  constructor(props) {
    super();
    this.state = {
      patient: {}

    }

  }
  handlepatientData = () => {

  }
  componentDidMount = () => {
    // console.log(this.props.patientData)
  }

  setSickShowByPatient = (patient) => {
    this.setState({
      patient

    })
    console.log(patient.id)

  }


  render() {
    if (typeof this.props.message !== "undefined") {
      return (
        <div className=" contentlayout content-wrapper">
          <div className="column is-4 is-offset-4">
            <div className="notification is-danger">
              <button className="delete"></button>
              {this.props.message}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className=" contentlayout content-wrapper">
          <section className="content-header headerMarginTop">
            <div className="row titleBackgr">
              <h3>Danh sách bệnh nhân của bệnh viện </h3>
            </div>
            <div className="form-group ">
              <label htmlFor="example1">Tìm kiếm</label>
              <input type="text" id="example1" onChange={event => this.props.onSearch(event.target.value)} className="form-control form-control-lg" />
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="box">
                  <Patient
                    setSickShowByPatient={this.setSickShowByPatient}
                    getSickbypatient={this.props.getSickbypatient}
                    patientData={this.props.patientData} />
                  <Sick
                    getRecordMedecal={this.props.getRecordMedecal}
                    patient={this.state.patient}
                    sickCodeByPatient={this.props.sickCodeByPatient} />
                  <RecordMedical
                    patient={this.state.patient}
                    recordMedical={this.props.recordMedical} />
                  <CreateMedical createMedical={this.props.createMedical} />
                </div>
              </div>
            </div>
          </section>
        </div>
      )
    }
  }

}