import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage, writeMessage } from '../store/messages';

class NewMessageEntry extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    handleChange(evt) {
        this.props.writeMessage(evt.target.value);
    }

    async handleSubmit(evt) {
        evt.preventDefault();

        const { newMessageEntry, name } = this.props;
        const content = newMessageEntry;
        console.log('name', name)
        await this.props.postMessage(content, name);
        this.props.writeMessage('');
        this.scrollToBottom();
    }

    scrollToBottom() {
        const chatPage = document.querySelector(".chat-page");
        chatPage.scrollTo(0, chatPage.scrollHeight);
    }

    render() {
        return (
            <form id="new-message-form" className="newEntry" onSubmit={this.handleSubmit}>
                <div className="input-group input-group-lg">
                    <input
                        className="chat-input"
                        type="text"
                        name="content"
                        value={this.props.newMessageEntry}
                        onChange={this.handleChange}
                        autoComplete="off"
                        placeholder="Say something nice..."
                    />
                    <span className="input-group-btn">
                        <button class="btn btn-info btn-rounded btn-sm waves-effect waves-light float-right" type="submit">Make A GIF!</button>
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
