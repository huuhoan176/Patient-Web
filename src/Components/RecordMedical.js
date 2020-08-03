import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import RecordMedicalDetail from './RecordMedicalDetail';


class RecordMedical extends Component {
  constructor(props) {
    super();
    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    this.state = {
      visible: false,
      realTime: "",
      thongtinbenhnhan: ["không có thông tin "],
      ketquaxetnghiep: ["không có thông tin "],
      CommentByDoctor: ["không có thông tin "],
      Imgeexamination: ""



    };
  }

  closeModal() {
    this.setState({ visible: false, data: "", realTime: "" });
  }

  openModal(dataRecord, time) {

    console.log(" thoi gian nay vs data la : " + dataRecord)
    let nhiptim = dataRecord.split("#");
    let thongtinbenhnhan = nhiptim[0];
    let ketquaxetnghiep = ["không có thông tin "];
    let CommentByDoctor = ["không có thông tin "];
    let Imgeexamination = nhiptim[1];
    thongtinbenhnhan = thongtinbenhnhan.split(";");
    console.log("thongtinbenhnhan:" + thongtinbenhnhan)
    if (nhiptim[1] == null) {
      // alert("khong co ket qua xet nghiem")
    } else {
      ketquaxetnghiep = nhiptim[1];
      ketquaxetnghiep = ketquaxetnghiep.split(";");
      console.log("ketquaxetnghiep:" + ketquaxetnghiep);
    }
    if (nhiptim[2] == null) {
      // alert("khong co nhan xet cua bac si")
    } else {
      CommentByDoctor = nhiptim[2];
      CommentByDoctor = CommentByDoctor.split(";");
      console.log("CommentByDoctor:" + CommentByDoctor)
    }

    this.setState({ visible: true, realTime: time, thongtinbenhnhan, ketquaxetnghiep, CommentByDoctor, Imgeexamination });
  }

  render() {
    let a = 0;
    return (
      <div className="col-md-3">
        <div className="bodertitle" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <span><h3>Lịch sử khám bệnh </h3></span>
          <span className="pull-right-container">
          </span>
        </div>
        <div className="bodercontent patientmargintop">
          <ul className="stylehospital ">
            {
              this.props.recordMedical.map((data) => {
                a++;
                return (<li className="input2">
                  <section>
                    <span>{a}</span>:  <input type="button" value={data.realTime} onClick={event => this.openModal(data.description, data.realTime)} />
                    <hr />
                    <Modal visible={this.state.visible} width="1300" height="660" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                      <div>
                        <RecordMedicalDetail patient={this.props.patient} thongtinbenhnhan={this.state.thongtinbenhnhan} ketquaxetnghiep={this.state.ketquaxetnghiep}
                          CommentByDoctor={this.state.CommentByDoctor} realTime={this.state.realTime} Imgeexamination={this.state.Imgeexamination} />
                        <a style={{ margin: 10 }} href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                      </div>
                    </Modal>
                  </section>
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

export default RecordMedical;