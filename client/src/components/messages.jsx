import React, { useRef, useEffect } from 'react';

import Message from './message';

const Messages = ({ messages, name }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({
            block: 'nearest',
        });
    };

    useEffect(scrollToBottom, [messages]);

    return (
        <div className="messages">
            {messages.map(({ message, _id }) => (
                <div key={_id}>
                    <Message message={message} currentUser={name.trim()} />
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Messages;
