import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateName } from '../store/messages';

class NameEntry extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.updateName(evt.target.value);
  }

  render() {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={this.handleChange}
          value={this.props.name}
        />
      </form>
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