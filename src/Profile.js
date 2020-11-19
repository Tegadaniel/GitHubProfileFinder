import React, { Component } from 'react';
import axios from "axios";
import './Profile.css';
const client_ID = 'f61c1b47e65d6ee85732';
const client_Secret = 'bc2e42a3a027660b8960ec39d63ee395127f9aca';


//.env
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      data: null
    };

      }


 

  handleSubmit = async e => {
    e.preventDefault();


    const url = `https://api.github.com/users/${this.state.username}?client_id=${client_ID}&client_Secret=${client_Secret}`;
    const response = await axios.get(url);
    console.log(response.data);
    this.setState({ data: response.data })

    this.setState({
      username: ""
    });

  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary mb-3">
          <div className="Container">
            <a href="#home" className="navbar-brand">Github Finder</a>
          </div>
        </nav>
        <div className="container">
          <div className="search card card-body">
            <h1>Search Github User</h1>
            <p className="lead"> Enter username to fetch user profile and repos</p>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username">Enter username</label>
              <input
                name="username"
                id="username"
                type="text"
                className="form-control mb-4"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="Github Username" />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>

          </div>
          <br />

          {this.state.data ? (
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-3">
                  <>
                    <h1 className="lead">Avatar:</h1> <img className="img-fluid mb-2" alt="avatar" src={this.state.data.avatar_url} />

                    <a href={this.state.data.html_url} className="btn btn-primary btn-block">View Profile </a>
                  </>
                </div>
                <div className="col-md-9 ">
                  <span
                    className="badge badge-primary block">
                    Public Gist:{this.state.data.public_gists}
                  </span>
                  <span
                    className="badge badge-info block">
                    Public Repos:{this.state.data.public_repos}
                  </span>
                  <span
                    className="badge badge-secondary block">
                    Followers:{this.state.data.followers}
                  </span>
                  <span
                    className="badge badge-success block">
                    Following:{this.state.data.following}
                  </span>
                  <br /><br />
                  <ul className="list-group">
                    <li className="list-group-item">Company: {this.state.data.company}</li>
                    <li className="list-group-item">Website/Blog: {this.state.data.blog}</li>
                    <li className="list-group-item">Location: {this.state.data.location}</li>
                    <li className="list-group-item">Twitter Username: {this.state.data.twitter_username}</li>
                    <li className="list-group-item">Member Since: {this.state.data.created_at}</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}





        </div>



      </div>
    )
  }
}

export default Profile;