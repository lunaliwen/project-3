import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./detail.css";


class Detail extends Component {
    state = {
        challenge: {
            comment: {},
            link: {},
            uploads:[]
        }
    };
    // When this component mounts, grab the book with the _id of this.props.match.params.id
    // e.g. localhost:3000/books/599dcb67f0f16317844583fc
    componentDidMount() {
        API.getChallenge(this.props.match.params.id)
            .then((res) => {
                this.setState({ challenge: res.data })
                console.log(res.data);
            })
            .catch(err => console.log(err));

        console.log("componentDidMount lifecycle method ran!");
        // axios.get("allusers")
        //   .then(response => { console.log(response)});

        // Check session data to see if user should be logged in

        axios.get("/user_data")
            .then(response => {
                console.log(response);
                if (response.data.loggedIn) {
                    this.setState({ loggedIn: true, username: response.data.username, userId: response.data.userId });
                } else {
                    console.log("No logged in user stored in session");
                }
            });

    }

    renderRedirect = () => {
        return <Redirect to='/home' />

    }

    handleSubmit = (event) => {
        event.preventDefault();
        const uploadInfo = { challenge: this.props.match.params.id, comment: this.state.comment, link: this.state.link, user: this.state.userId }
        console.log(uploadInfo)
        axios.post("/submit", uploadInfo)
            .then(response => {
                console.log(response);
                this.setState({challenge:response.data})
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

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
                    <h1 className="title"><strong>{this.state.challenge.title}</strong></h1>
                    <br></br>
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.challenge.description}</h5>

                    <div className="user uploads">
             

                        <ul className="list-group list-group-flush">
                          
                          {
                           
                           this.state.challenge.uploads.map((upload) =>
                              <div>
                              <li className="list-group-item"><strong>Username:&nbsp;</strong>{upload.user.username} &nbsp;
                              <strong>Link:&nbsp;</strong>
                              <a href= {upload.link}>{upload.link}</a> 
                              <br></br>
                              <iframe title="This is a unique title" width="560" height="315" src={'https://www.youtube.com/embed/' + upload.link.toString().substring(32)} 
                              frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                              <br></br>
                              <strong>&nbsp;Comments:&nbsp;</strong>{upload.comment}</li>
                           </div>
                            )
                          }
                        </ul>

                    </div>

                    <br></br>
                    
                    {this.state.loggedIn ? 
                    !this.state.challenge.uploads.some(x => x.user.username == this.state.username) ?
                    <div className = "upload-container">
                  

                    <form>

                        <div className="form-group">
                            <label htmlFor="exampleInputVideo1">Your YouTube Link:</label>
                            <input onChange={this.handleInputChange} type="video" className="form-control" id="link" name="link" aria-describedby="videoHelp" placeholder="Enter YouTube link" />
                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Your comments</label>
                            <textarea onChange={this.handleInputChange} className="form-control" id="comment" name="comment" rows="3"></textarea>
                        </div>

                        <br></br>
                        <br></br>
                        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    </div>
                    :"":""}

                </div>

                
   <footer>@ 2019 By Liwen Ma</footer>

            </div>
        );
    }
}

export default Detail;
