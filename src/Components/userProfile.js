import React, { Component } from 'react'

class UserProfile extends Component {
  render() {
    return (
      <div >
        <div className="row">
          <div >
            <div className="panel panel-default">
              <div className="panel-heading" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <h4 >Thông tin bệnh nhân</h4>
              </div>
              <div className="panel-body">

                <div className="box box-info">

                  <div className="box-body styleBody">
                    <div >
                      <div align="center"> <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" className="img-circle img-responsive styleimg" />
                        <h3>{this.props.PatientDetail.name}</h3>
                      </div>
                      <br />
                    </div>
                    <div>
                      <h4><span>Tuổi :       </span>{this.props.PatientDetail.age} </h4>
                      <h4><span>CMND/CCCD :       </span> {this.props.PatientDetail.cmt}</h4>
                      <h4><span>Giới tính :       </span> {this.props.PatientDetail.sex}</h4>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    )
  }
}

export default UserProfile;