import React from 'react';

const Message = ({ message: { name, text }, currentUser }) => {
    let isSentByCurrentUser = false;

    if (name === currentUser) isSentByCurrentUser = true;

    return isSentByCurrentUser ? (
        <div className="message-container">
            <p className="sent-text">{name}</p>
            <div className="message-box backgroundBlue">
                <p className="message-text">{text}</p>
            </div>
        </div>
    ) : (
        <div className="message-container justifyStart">
            <div className="message-box">
                <p className="message-text text-dark">{text}</p>
            </div>
            <p className="sent-text px-1">{name}</p>
        </div>
    );
};

export default Message;
