import React, { Component } from 'react';
import {	 Link } from "react-router-dom";
import RegisterForm from '../components/RegisterForm/RegisterForm';
import axios from 'axios';

class Register extends Component {
	state = {
		email: '',
    password: '',
    registered: false
  };
  
  Registered = () => {
    this.setState({
      registered: true
    })
  }

	onSubmit = (e) => {
		e.preventDefault();
		let apiBaseURL = 'http://localhost:8080/';
		let payload = {
			email: this.state.email,
			password: this.state.password
		};
		console.log(payload);
		axios
			.post(`${apiBaseURL}signup?email=${payload.email}&password=${payload.password}`)
			.catch((err) => console.log('failed! ', err))
			.then(() => {
        console.log('signup successful');
        this.Registered();
        
			});
	};

	onChangeEmail = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	onChangePassword = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	render() {
    const signedup = this.state.registered

		return (
			<div>
				<RegisterForm
					{...this.state}
					onChangeEmail={this.onChangeEmail}
					onChangePassword={this.onChangePassword}
          onSubmit={this.onSubmit}
          Registered={this.Registered}
				/>
				<div>
        {signedup ? <p>you're registered, return to the log-in page to get coding!</p> : <p>sign up to access SnapDocs!</p>}
        </div>
        <Link to="/" className="signInLinkDiv">
					Sign-In
				</Link>
			</div>
		);
	}
}

export default Register;
