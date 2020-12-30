import React from 'react';
import { connect } from 'react-redux';

import { toggleResourceInfo } from '../redux/project-info/project-info.actions';

const PopupInfo = ({ toggleResourceInfo, resource, task }) => {
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
                <div className="popup-card-task">
                    <p>
                        <strong>Task Title: </strong> {task.taskTitle}
                    </p>
                    <p>
                        <strong>Task Description: </strong>
                        {task.taskDescription}
                    </p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    resource: state.projectInfo.resource.resourceInfo,
    task: state.projectInfo.resource.taskInfo,
});

export default connect(mapStateToProps, { toggleResourceInfo })(PopupInfo);
