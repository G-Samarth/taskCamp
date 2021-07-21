import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Message from './message';

const Messages = ({ messages, user, projectInfo }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({
            block: 'nearest',
        });
    };

    useEffect(scrollToBottom, [messages]);
    return (
        <div
            className={`messages ${
                user.userType !== 'Resource' && 'messages-sm'
            }`}
        >
            {!projectInfo.loading &&
                messages?.map((message, i) => (
                    <div key={i}>
                        <Message
                            message={message}
                            user={user}
                            lead={projectInfo.leadOrManager}
                            resource={projectInfo?.resource?.resourceInfo}
                        />
                    </div>
                ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    projectInfo: state.projectInfo,
});

export default connect(mapStateToProps)(Messages);
