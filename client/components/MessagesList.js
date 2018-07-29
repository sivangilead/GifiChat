import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';

class Messages extends Component {

    render() {
        const messages = this.props.messages;
        return (
            <div>
                <ul className="media-list">
                    {messages.map(message => <Message message={message} />)}
                </ul>
                <NewMessageEntry />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages.messages
    }
}

export default connect(mapStateToProps)(Messages);