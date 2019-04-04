import React, { Component } from "react";
// import { withRouter } from "react-router";
import LoginForm from "../components/LoginForm/LoginForm";
import axios from "axios";

class Login extends Component {
      state = {
        email: "",
        password: ""
      };

  onSubmit = e => {
      e.preventDefault();
      let apiBaseURL = "http://localhost:8080/";
      let payload = {
        email: this.state.email,
        password: this.state.password
    };

    console.log(payload);
    axios
        .post(
          `${apiBaseURL}login?email=${payload.email}&password=${payload.password}`
        )
        .catch(err => console.log("failed!", err))
        .then(response => {
          if (response.status === 200) {
            console.log("Login successful");
            console.log(response);
            console.log(response.data.token);
            localStorage.setItem("token", JSON.stringify(response.data.token));
		        localStorage.setItem("email", JSON.stringify(payload.email));
            // to retrieve, write const retrievedToken = localStorage.getItem('token');
		        // to retrieve, write const retrievedEmail = localStorage.getItem('email');
		       this.props.history.push("/dashboard")
          } else if (response.status === 204) {
           console.log("Username and password don't match");
         } else {
           console.log("Username does not exist");
        }
      })
        .catch(err => {
          console.log(err);
        });
  };

  onChangeEmail = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
  };

  onChangePassword = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
  };

  render() {
      return (
          <div>
              <LoginForm
                {...this.state}
                onChangeEmail={this.onChangeEmail}
                onChangePassword={this.onChangePassword}
                onSubmit={this.onSubmit}
              />
               <Link to="/register" className="linkToRegister">
          Register
        </Link>
          </div>
      );
  }
}

export default Login;
