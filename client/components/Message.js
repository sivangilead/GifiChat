import React from 'react';

export default function Message(props) {

    const message = props.message;

    return (
        <li className="media">
            <div className="media-left">
                <a href="#">
                    <img height="180" className="media-object" src={message.url} alt="image" />
                </a>
            </div>
            <div className="media-body">
                <h4 className="media-heading">{message.name}</h4>
                {message.content}
            </div>
        </li>
    );
}
