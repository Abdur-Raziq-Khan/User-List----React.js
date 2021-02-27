import React, { Component } from "react";
import "./style.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      pageNum: 1,
      totalPages: 0
    }
  }

  componentDidMount() {
    this.changePage(this.state.pageNum);
  }

  changePage(pageNum) {
    const url = `https://reqres.in/api/users?page=${pageNum}`;

    fetch(url)
    .then(res => res.json())
    .then(res => this.setState({ users: res.data, pageNum: pageNum, totalPages: res.total_pages}));
  }

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <p>User List</p>
        <div className="users">
          {users.map((user) => (
            <div className="card" key={user.id}>
              <img className="card-avatar-top" src={user.avatar} alt={`${user.email} avatar`} />
              <div className="card-body">
                <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                <p className="card-text">{user.email}</p>
              </div>
          </div>
          ))}
        </div>
        <div className="btn-group">
          <button 
          type="button"
          disabled={this.state.pageNum === 1 ? true : false}
          onClick={() => this.changePage(this.state.pageNum - 1)}
          >
          Prev
          </button>
          <button 
          type="button"
          >
          {this.state.pageNum}
          </button>
          <button 
          type="button"
          disabled={this.state.pageNum >= this.state.totalPages ? true : false}
          onClick={() => this.changePage(this.state.pageNum + 1)}
          >
          Next
          </button>
        </div>
      </div>
    )
  }
}

export default App;