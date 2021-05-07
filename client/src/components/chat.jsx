import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { io } from 'socket.io-client';

import Messages from './messages';

let socket;

const Chat = ({ user, match }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket = io('ws://localhost:4000');

        socket.emit(
            'join',
            {
                name: user.name,
                projectId: match.params.projectId,
            },
            (error) => {
                if (error) console.log(error);
            }
        );

        return () => {
            socket.emit('disconnection');
            socket.off();
        };
    }, [user.name, match.params.projectId]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    return (
        <div className="chat">
            <Messages messages={messages} name={user.name} />
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

export default connect(mapStateToProps)(withRouter(Chat));
