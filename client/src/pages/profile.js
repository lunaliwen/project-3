import React, { Component } from "react";
//import Login from "./Login";
import axios from "axios";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import "./home.css";

class profile extends Component {

  state= {
    loggedIn: true
  }

  componentDidMount() {
    // API.getChallenge(this.props.match.params.id)
    //     .then((res) => {
    //         this.setState({ challenge: res.data })
    //         console.log(res.data);
    //     })
    //     .catch(err => console.log(err));

    console.log("componentDidMount lifecycle method ran!");
    // axios.get("allusers")
    //   .then(response => { console.log(response)});

    // Check session data to see if user should be logged in

    axios.get("/user_data")
        .then(response => {
            console.log(response);
            if (response.data.loggedIn) {
                
                this.setState({ loggedIn: true, username: response.data.username, password: response.data.password, 
                upload0: response.data.uploads[0].link,
                upload1: response.data.uploads[1].link,
                upload2: response.data.uploads[2].link, 
                upload3: response.data.uploads[3].link || ""

                });
            } else {
                console.log("No logged in user stored in session");
            }
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

  renderRedirect = () => {
    return <Redirect to='/' />
  }

render() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" ><strong>GoDare!!</strong></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarNav">
      <li className="nav-item active">
        <a className="nav-link" href="/home">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home <span className="sr-only">(current)</span></a>
      </li>
 </div>

   <div>
      <li className="nav justify-content-end">
        <a className="nav-link" href="/profile">Profile</a>
      </li>
    </div>

</nav>
      
      
      <h3>Username:{this.state.username}</h3>
      <h3>Password:{this.state.password}</h3>
      
      <h5>Your videos:</h5>
      <a href={this.state.upload0}>{this.state.upload0}</a>
      <br></br>
      <a href={this.state.upload1}>{this.state.upload1}</a>  
      <br></br>
      <a href={this.state.upload2}>{this.state.upload2}</a> 
      <br></br>
      <a href={this.state.upload3}>{this.state.upload3}</a> 



      <br></br>
      <br></br>
      <button onClick={this.handleLogout}>Log Out of Application</button>
      {!this.state.loggedIn ? this.renderRedirect(): null }
    </div>
  );
}

}


export default profile;