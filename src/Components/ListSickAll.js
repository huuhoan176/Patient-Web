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

class ListSickAll extends Component {
  constructor(props) {
    super();
    this.state = ({
    })
  }


  render() {
    let a = 0;
    return (
      <div>
        <div className="bodertitle" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <span><h3>Danh sách bệnh </h3></span>
        </div>
        <div className="bodercontent patientmargintop">
          <ul className="stylehospital">
            {
              this.props.sickDataAll.map((data) => {
                a++;
                return (
                  <li className="input2">
                    <a onClick={event => this.props.setPatientToSick(data.name, data.sickCode)}> <span>{a}</span>: {data.name}</a>
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

export default ListSickAll;