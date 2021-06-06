import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { toggleResourceInfo } from '../redux/project-info/project-info.actions';
import { addResource } from '../redux/projects/projects.actions';

import Chat from '../components/chat';

const PopupInfo = ({
    toggleResourceInfo,
    resource,
    task,
    addResource,
    editMode,
    currentUser,
    match,
}) => {
    const [formData, setFormData] = useState({});

    const { taskTitle, taskDescription } = formData;

    useEffect(() => {
        setFormData({
            taskTitle: task.taskTitle,
            taskDescription: task.taskDescription,
        });
    }, [task]);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        addResource(formData, match.params.projectId, resource._id, true);
    };

    return (
        <div className="popup" id="popup">
            <div className="popup-card p-3 bg-white border-5">
                <div
                    className="popup-close"
                    onClick={() => toggleResourceInfo()}
                >
                    &times;
                </div>
                <div className="popup-card-info">
                    <img
                        className="round-img"
                        src={resource.avatar}
                        alt="Profile"
                    />
                    <p className="md">{resource.name}</p>
                    <p className="sm">{resource.email}</p>
                </div>
                {!editMode ? (
                    <div className="popup-card-task">
                        <p>
                            <strong>Task Title: </strong> {task.taskTitle}
                        </p>
                        <p>
                            <strong>Task Description: </strong>
                            {task.taskDescription}
                        </p>
                    </div>
                ) : (
                    <form className="form-add" onSubmit={(e) => onSubmit(e)}>
                        <label className="form-add-label">Task Title</label>
                        <input
                            className="form-add-input blur-sm"
                            type="text"
                            placeholder="Task Title"
                            name="taskTitle"
                            value={taskTitle}
                            onChange={(e) => onChange(e)}
                            required
                        />

                        <label className="form-add-label">
                            Task Description
                        </label>
                        <textarea
                            className="form-add-input blur-sm"
                            placeholder="Task Description"
                            name="taskDescription"
                            rows="10"
                            value={taskDescription}
                            onChange={(e) => onChange(e)}
                            required
                        ></textarea>
                        <input
                            type="submit"
                            className="btn btn-primary blur-sm"
                            value="Save"
                        />
                    </form>
                )}
                {!editMode && currentUser.userType !== 'Manager' && (
                    <Chat
                        leadId={currentUser._id}
                        resourceId={resource._id}
                        projectId={match.params.projectId}
                    />
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    resource: state.projectInfo.resource.resourceInfo,
    task: state.projectInfo.resource.taskInfo,
    editMode: state.projectInfo.editMode,
    currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps, {
    toggleResourceInfo,
    addResource,
})(withRouter(PopupInfo));
