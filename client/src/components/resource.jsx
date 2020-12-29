import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resource = ({ resource }) => {
    const [resourceInfo, setResourceInfo] = useState({
        name: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        axios.get(`/auth/user/${resource.user}`).then((data) => {
            console.log(data.data);
            setResourceInfo(data.data);
        });
    }, [resource.user]);

    return (
        <div className="resource-section-card p-3 bg-white border-5 blur-md">
            <div className="resource-section-card-info">
                <img
                    className="round-img"
                    src={resourceInfo.avatar}
                    alt="Profile Picture"
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

export default Resource;
