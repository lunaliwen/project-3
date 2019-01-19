import React, { Component } from "react";
//import Login from "./Login";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./home.css";
import Card from "../components/Card.js";
import API from "../utils/API";

class Home extends Component {

  state= {
    loggedIn: true,
    challenges: []
  }

  componentDidMount() {
    API.getChallenges()
        .then((res) => { 
          this.setState({ challenges:res.data })
          console.log(res.data);
        })
          
  
        .catch(err => console.log(err));
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
     {this.state.challenges.map(challenge => (
          <Card
            id={challenge._id}
            key={challenge._id}
            title={challenge.title}
            image={challenge.image}
            description={challenge.description}
          />
        ))}     
      
  </div> 


   <footer>@ 2019 By Liwen Ma</footer>
  
    </div>

  );
}

}


export default Home;