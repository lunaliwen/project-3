import React, { Component } from "react";
//import Login from "./Login";
import axios from "axios";
import API from "../utils/API";
import { Redirect, Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import "./home.css";

class profile extends Component {

  state= {
    loggedIn: true,
    uploads: []
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
                uploads: response.data.uploads
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
  <a className="navbar-brand" ><strong>GoDare!</strong></a>
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
      
    <div className="container">
      <br></br>
      <br></br>
      
      <h3>Username:&nbsp;&nbsp;{this.state.username}</h3>
      <br></br>
      
      <h3>Your videos:</h3>

      {this.state.uploads.length ? (
              <List>
                {this.state.uploads.map(upload => (
                  <ListItem key={upload._id}>
                    <a href={upload.link}>
                      <strong>
                        {upload.link}
                      </strong>
                    </a>
                 
                  </ListItem>
                ))}
              </List>
            ) : (
              <h5>No videos yet.</h5>
            )}

  


      <br></br>
      <br></br>
      <button onClick={this.handleLogout}>Log Out of Application</button>
      {!this.state.loggedIn ? this.renderRedirect(): null }
      </div> 

   
    </div>
  );
}

}


export default profile;