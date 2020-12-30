import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { toggleResourceInfo } from '../redux/project-info/project-info.actions';

const Resource = ({ resource, toggleResourceInfo }) => {
    const [resourceInfo, setResourceInfo] = useState({
        name: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        axios.get(`/auth/user/${resource.user}`).then((data) => {
            setResourceInfo(data.data);
        });
    }, [resource.user]);

    return (
        <div
            className="resource-section-card p-3 bg-white border-5 blur-md"
            onClick={() =>
                toggleResourceInfo({ resourceInfo, taskInfo: resource })
            }
        >
            <div className="resource-section-card-info">
                <img
                    className="round-img"
                    src={resourceInfo.avatar}
                    alt="Profile"
                />
                <p>{resourceInfo.name}</p>
                <p>{resourceInfo.email}</p>
            </div>
            <div className="resource-section-card-task">
                <p>
                    <strong>Task Title: </strong> {resource.taskTitle}
                </p>
                <p>
                    <strong>Task Description: </strong>
                    {resource.taskDescription.length > 100
                        ? resource.taskDescription.substring(0, 100) + '...'
                        : resource.taskDescription}
                </p>
            </div>
        </div>
    );
};

export default connect(null, { toggleResourceInfo })(Resource);
