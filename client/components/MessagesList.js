import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { fetchMessages } from '../store/messages';

class Messages extends Component {

    async componentDidMount() {
        this.props.fetchMessages()
    }

    render() {
        const messages = this.props.messages;
        return (
            <div>
                <ul className="media-list">
                    {messages.map(message => <div className="message"><Message key={message.id} message={message} /></div>)}
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
const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessages: () => dispatch(fetchMessages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);