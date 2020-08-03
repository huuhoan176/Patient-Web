import React, { Component } from 'react';
import Modal from 'react-awesome-modal';



class RecordMedicalDetail extends Component {
  constructor(props) {
    super();
    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);
  
    this.state = {

      thongtinbenhnhan: null,
      ketquaxetnghiep: null,
      CommentByDoctor: null
    };
  }
  // componentDidMount=()=>{
  //   console.log(this.props.dataRecordDetail);
  //   this.filterData(this.props.dataRecordDetail)
  // }


  render() {
    if(this.props.thongtinbenhnhan===null||this.props.ketquaxetnghiep===null||this.props.CommentByDoctor===null){
      return (
        <div className="container">
        <h2>Không có dữ liệu chuẩn</h2>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <h3 className="alignCenter">Khám và chuẩn đoán bệnh</h3>
          <div className="col-md-4">
            <ul>
              <li>Ngày: {this.props.realTime}</li>
              <li>Họ tên bệnh nhân:{this.props.patient.name}</li>
              <li>Tuổi: {this.props.patient.age}</li>
              <li>CMND/CCCD: {this.props.patient.cmt}</li>
              <li>Giới Tính: {this.props.patient.gender}</li>



            </ul>
          </div>
          <div className="col-md-4">
          <ul>
          {this.props.thongtinbenhnhan.map((data1) =>
          
            {data1=data1.split(":");
              if(data1[0]==="nhiptim")return <li>nhịp tim : {data1[1]} lần/phút</li>
            else if(data1[0]==="cangnang")return <li>cân nặng : {data1[1]}kg</li>
            else if(data1[0]==="huyetap") return <li>huyết áp: {data1[1]}MmHg</li>
          else if(data1[0]==="chieucao") return <li>chiều cao :{data1[1]}cm</li>
        else {
          return<li>{data1[0]}:{data1[1]}</li>
        }}
          )}
          </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6" >
            <table>
              <tr>
                <th>Tên các xét nghiệm</th>
                <th>kết quả </th>
              </tr>
            {
              this.props.ketquaxetnghiep.map((data) => {
                data=data.split(":");
                return(<tr>
                  <td>{data[0]}</td>
                  <td>{data[1]}</td>
  
                </tr>)
              })
            }
            </table>
          </div>
          <div className="col-md-4">
          <img className="style-img" src={`https://ipfs.io/ipfs/${this.props.Imgeexamination}`} alt="" />
          <h3>Hình ảnh </h3>
          </div>
        </div>
        <div className="row">
          {/* <a onClick={event => this.filterData(this.props.dataRecordDetail)}>click</a> */}
          <p>Diễn biến bệnh : {this.props.CommentByDoctor[0]}</p>

          <p>Chuẩn đoán bệnh : {this.props.CommentByDoctor[1]}</p>
          <p>Điều trị : {this.props.CommentByDoctor[2]}</p>
          {/* <p>Điều trị : {this.props.dataRecordDetail}</p> */}
        </div>
      </div>
    )
  }
}

export default RecordMedicalDetail;