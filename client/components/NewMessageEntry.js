import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage, writeMessage } from '../store/messages';

class NewMessageEntry extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.props.writeMessage(evt.target.value);
    }

    handleSubmit(evt) {
        evt.preventDefault();

        const { newMessageEntry, name } = this.props;
        const content = newMessageEntry;
        console.log(name)
        this.props.postMessage(content, name);
        // this.props.writeMessage('');
    }

    render() {
        return (
            <form id="new-message-form" onSubmit={this.handleSubmit}>
                <div className="input-group input-group-lg">
                    <input
                        className="form-control"
                        type="text"
                        name="content"
                        value={this.props.newMessageEntry}
                        onChange={this.handleChange}
                        placeholder="Say something nice..."
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">Make A GIF!</button>
                    </span>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        newMessageEntry: state.messages.newMessageEntry,
        name: state.messages.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postMessage: (message, name) => dispatch(postMessage(message, name)),
        writeMessage: (string) => dispatch(writeMessage(string))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
