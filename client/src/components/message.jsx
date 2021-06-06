import React from 'react';

const Message = ({ message: { text, sender }, user, lead, resource }) => {
    let isSentByCurrentUser = false;
    if (user._id === sender) isSentByCurrentUser = true;

    return isSentByCurrentUser ? (
        <div className="message-container">
            <p className="sent-text">{user.name}</p>
            <div className="message-box backgroundBlue">
                <p className="message-text">{text}</p>
            </div>
        </div>
    ) : (
        <div className="message-container justifyStart">
            <div className="message-box">
                <p className="message-text text-dark">{text}</p>
            </div>
            <p className="sent-text px-1">
                {user.userType === 'Lead' ? resource.name : lead.name}
            </p>
        </div>
    );
};

export default Message;
