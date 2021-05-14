import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
    sendMessage,
    getMessages,
} from '../redux/project-info/project-info.actions';

import Messages from './messages';

const Chat = ({
    auth: { loading, currentUser },
    match,
    sendMessage,
    getMessages,
    projectInfo: { messagesLoading, messages, resource },
}) => {
    const [text, setText] = useState('');

    useEffect(() => {
        setInterval(() => {
            !loading &&
                getMessages(
                    currentUser.userType,
                    match.params.projectId,
                    resource?.resourceInfo?._id
                );
        }, 1000);
    }, [
        loading,
        getMessages,
        currentUser.userType,
        match.params.projectId,
        resource?.resourceInfo,
    ]);

    const handleSend = (event) => {
        event.preventDefault();
        const message = {
            text,
        };

        sendMessage(
            message,
            currentUser.userType,
            match.params.projectId,
            resource?.resourceInfo?._id
        );
        setText('');
    };

    return (
        <div className="chat">
            <Messages messages={messages} name={currentUser.name} />
            {!messagesLoading && (
                <div className="chat-form">
                    <input
                        className="chat-input"
                        type="text"
                        placeholder="Type a message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={(event) =>
                            event.key === 'Enter' ? handleSend(event) : null
                        }
                    />
                    <button
                        className="btn btn-success blur-sm"
                        onClick={(e) => handleSend(e)}
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    projectInfo: state.projectInfo,
});

export default connect(mapStateToProps, { sendMessage, getMessages })(
    withRouter(Chat)
);
