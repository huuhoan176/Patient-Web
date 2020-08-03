import React, { Component } from 'react';
import ipfs from './ipfs';
import IPFSUploader from 'ipfs-image-web-upload';
import IPFS from 'ipfs';

class CreateMedical extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      text: "",
      imageSrc: ''
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    // console.log(URL.createObjectURL(event.target.files[0]))
    this.setState({ imageSrc: URL.createObjectURL(event.target.files[0]) })
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }
  setText = (data) => {
    console.log(data)
    this.setState({
      text: data
    })
  }

  onSubmit(event) {
    event.preventDefault()
    ipfs.files.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error)
        return
      }

      this.setState({ ipfsHash: result[0].hash , imageSrc: ''})
      let RecordCode = this.state.text + "#" + result[0].hash;
      this.props.createMedical(RecordCode)
    })
  }

  render() {
    const { ipfsHash, imageSrc } = this.state;
    const sourceImage = ipfsHash ? `https://ipfs.io/ipfs/${ipfsHash}` : imageSrc
    return (
      <div className="col-md-3">
        <div className="boderbuttom" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <span><h3>Tạo bản ghi khám bệnh</h3></span>
          <span className="pull-right-container">
          </span>
        </div>

        <div className="pure-g">
          <div className="pure-u-1-1">
            <form onSubmit={this.onSubmit} style={{ marginTop: 50 }}>
              <input type="text" onChange={event => this.setText(event.target.value)} />
              <input type='file' onChange={this.captureFile} />
              <input type='submit' value="Upload" />
            </form>
            <div style={{ width: 400, height: 400 }}>
              <img className="style-img"
                src={sourceImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateMedical;
