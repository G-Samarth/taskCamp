import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

const Project = ({ history, project }) => {
    const onClick = () => {
        history.push(`/dashboard/${project._id}`);
    };

    return (
        <Fragment>
            <div className="project border-5 blur-md" onClick={() => onClick()}>
                <div className="lead-img">
                    <img
                        className="round-img"
                        src="../dist/img/lead.jpg"
                        alt="Profile Picture"
                    />
                </div>

                <div className="project-info">
                    <p className="md">
                        <strong>Lead:</strong> {project.assignedTo}
                    </p>
                    <p className="email sm">
                        <strong>Email:</strong> lead-kristi@gmail.com
                    </p>
                    <p>
                        <strong>Task Title:</strong> {project.title}
                    </p>
                    <p>
                        <strong>Task Description:</strong> {project.description}
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Project);
