import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateName } from '../store/messages';
import { Link } from 'react-router-dom'

class NameEntry extends Component {

  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({ name: evt.target.value });
  }

  render() {
    return (
      <div>
        <h1 className="title">Welcome To:</h1>
        <img height="180" className="logo last-message text-muted" src='512x512.png' alt="image" />
        <form className="form-inline">
          <span className="nameEntry">
            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <Link
              to="/chat"
              onClick={() => {
                this.props.updateName(this.state.name)
              }}
            >
              <img height="50" src='arrow.png' alt="image" />
            </Link>
          </span>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.messages.name
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    updateName: (name) => dispatch(updateName(name))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(NameEntry);