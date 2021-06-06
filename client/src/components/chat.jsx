import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { io } from 'socket.io-client';

import Messages from './messages';

let socket;
const Chat = ({ leadId, resourceId, projectId, user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket = io('ws://localhost:4000');

        socket.emit(
            'join',
            {
                userId: user._id,
            },
            (error) => {
                if (error) console.log(error);
            }
        );

        return () => {
            socket.emit('disconnection');
            socket.off();
        };
    }, [user]);

    useEffect(() => {
        const loadMessages = () => {
            socket.emit('loadMessages', {
                userId: user._id,
                messagesWith: user.userType === 'Lead' ? resourceId : leadId,
                projectId,
            });

            socket.on('messagesLoaded', ({ chat }) => {
                setMessages(chat.messages);
            });
        };
        loadMessages();
    }, [user, resourceId, leadId, projectId]);

    useEffect(() => {
        socket.on('messageSent', ({ newMessage }) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        const sendToId = user.userType === 'Lead' ? resourceId : leadId;
        socket.on('messageReceived', async ({ newMessage }) => {
            if (newMessage.sender === sendToId) {
                setMessages((prev) => [...prev, newMessage]);
            }
        });
    }, [user, leadId, resourceId]);

    const sendMessage = (event) => {
        event.preventDefault();
        const sendToId = user.userType === 'Lead' ? resourceId : leadId;
        if (message) {
            socket.emit(
                'sendMessage',
                {
                    userId: user._id,
                    sendToId,
                    projectId,
                    message,
                },
                () => setMessage('')
            );
        }
    };

    return (
        <div className="chat">
            <Messages messages={messages} user={user} />
            <div className="chat-form">
                <input
                    className="chat-input"
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(event) =>
                        event.key === 'Enter' ? sendMessage(event) : null
                    }
                />
                <button
                    className="btn btn-success blur-sm"
                    onClick={(e) => sendMessage(e)}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.currentUser,
});

export default connect(mapStateToProps)(Chat);
