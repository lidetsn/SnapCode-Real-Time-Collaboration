import React from 'react'
import snapLogo from '../../assets/snap.png';
import openSocket from 'socket.io-client';
import './Home.css'
require('es6-promise').polyfill();
require('isomorphic-fetch');


const  socket = openSocket('http://localhost:8000');


class DashboardHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', savedStatus: 'not saving' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveStatus = this.handleSaveStatus.bind(this);

  }
  
  componentDidMount(){
      fetch('/api/gettext')
        .then(res => res.json())
        .then(data => this.setState({ text: data }));
        socket.on('subscribeToText', (text) => {
          this.setState({text: text});
        });
    };

  handleChange(value) {
    let status = '';
    if (value.length !== this.state.text.length) {
        console.log("I am Emitting");
        socket.emit('toText', value);
        status = 'Changes not saved.'
      };
      this.setState({text: value, savedStatus: status});
  };

  handleSaveStatus(status){
    this.setState({savedStatus: status})
    if (status === 'Saved!'){
      setTimeout(() => {
        this.setState({savedStatus: 'not saving'})
      },2000)
    }
  }

  handleSave() {
    this.handleSaveStatus('Loading...')
    fetch('/api/savetext', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: this.state.text})
    })
      .then(res => res.json())
      .then(data => {
        this.handleSaveStatus('Saved!')
      })
  }
  render() {
    let { savedStatus } = this.state;
    let saveStatusRender = () => {
      if (savedStatus === 'not saving'){
        return '';
      } else {
        return savedStatus;
      }
    }
    return (
      <div>
        <div className="top-nav">
          <div className="snap-logo">
            <img src={snapLogo} alt='snap Logo' />
          </div>
          <p className="save-status">{ saveStatusRender() }</p>
          <div onClick={this.handleSave} className="save-button">
            Save
          </div> 
          <a href="/"> <div  className="logout-button">Log Out </div></a>           
        </div>

        {/* <ReactQuill placeholder={'Start writing here... '} value={this.state.text} onChange={this.handleChange} /> */}
     
      </div>
    );
  }
};

export default DashboardHeader;
