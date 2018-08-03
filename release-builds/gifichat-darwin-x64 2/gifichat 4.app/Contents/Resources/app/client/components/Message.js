import React from 'react';

export default function Message(props) {

    const message = props.message;
    console.log(message)

    return (
        <li className="media">
            <div className="media-left">
                <a href="#">
                    <div class="text-small">
                        <strong>{message.author.name}</strong>
                        <img height="180" className="last-message text-muted" className="media-object" className="rounded mx-auto d-block" src={message.content} alt="image" />
                    </div>
                    {/* <h5 className="media-heading">{message.author.name} says:</h5>
                    <img height="180" className="media-object" src={message.content} alt="image" /> */}
                </a>
            </div>
            <div className="media-body">

            </div>
        </li>
    );
}
