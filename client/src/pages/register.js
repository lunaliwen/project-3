import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
//import logo from "./logo.svg";
import "./register.css";
//import Home from "./pages/Home.js";

class register extends Component {
  state = {
    username:"",
    password:"",
    loggedIn: false
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = { username: this.state.username, password: this.state.password }
    console.log(userInfo)
    axios.post("/registerSubmit", userInfo)
        .then(response => {
            console.log(response);
            this.setState({User:response.data})
            window.location.href = '/';
        })
        .catch(err => {
            console.log(err);
        })
}

  renderRedirect = () => {
    return <Redirect to='/home' />

  }

  handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleLogout = (event) => {
    event.preventDefault();
    axios.get("/logout", {
    })
      .then((response) => {
        console.log(response);
        this.setState({ loggedIn: false });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidMount() {
    console.log("componentDidMount lifecycle method ran!");
    // axios.get("allusers")
    //   .then(response => { console.log(response)});

    // Check session data to see if user should be logged in

    axios.get("/user_data")
      .then(response => {
        console.log(response);
        if (response.data.loggedIn) {
          this.setState({ loggedIn: true, username: response.data.username });
        } else {
          console.log("No logged in user stored in session");
        }
      });
  }

  render() {
    let banner = this.state.loggedIn ? `Woah! ${this.state.username} logged in!` : "UNAUTHORIZED USER";
    return (
      <div className="App">
        <h1>{banner}</h1>
        <div className="App-header">
          <h1 className="logo">GoBet!</h1>
          <h2>Hello, welcome to the world of homemade bets:)</h2>
        </div>
        <div className="App-intro">

          <br/>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input onChange={this.handleInputChange} value={this.state.username} type="username" className="form-control" id="username" name="username" aria-describedby="nameHelp" placeholder="Enter username" />
            </div>
          <br/>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={this.handleInputChange} value={this.state.password} type="password" className="form-control" id="password" name="password" placeholder="Password" />
            </div>

          </form>

          <br/>
          
          <button onClick={this.handleSubmit}>Register</button>

          {this.state.loggedIn ? this.renderRedirect(): null }
        </div>
        </div>
    );
  }
}

export default register;
