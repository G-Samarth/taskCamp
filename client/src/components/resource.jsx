import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { toggleResourceInfo } from '../redux/project-info/project-info.actions';
import { deleteResource } from '../redux/projects/projects.actions';

const Resource = ({
    userType,
    resource,
    toggleResourceInfo,
    editMode,
    deleteResource,
    project,
}) => {
    const [resourceInfo, setResourceInfo] = useState({
        _id: '',
        name: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        axios.get(`/auth/user/${resource.user}`).then((data) => {
            setResourceInfo(data.data);
        });
    }, [resource.user]);

    const handleClick = (e) => {
        e.stopPropagation();
        deleteResource(project._id, resourceInfo._id, userType);
    };

    return (
        <div
            className="resource-section-card p-3 bg-white border-5 blur-md"
            onClick={() =>
                toggleResourceInfo({ resourceInfo, taskInfo: resource })
            }
        >
            {editMode && (
                <div className="resource-del" onClick={(e) => handleClick(e)}>
                    &times;
                </div>
            )}
            <div className="resource-section-card-info">
                <img
                    className="round-img is-profile-sm"
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

const mapStateToProps = (state) => ({
    userType: state.auth.currentUser.userType,
    editMode: state.projectInfo.editMode,
    project: state.projects.project,
});

export default connect(mapStateToProps, { toggleResourceInfo, deleteResource })(
    Resource
);
