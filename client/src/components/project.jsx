import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

const Project = ({ history, project, userType }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        axios
            .get(
                `/auth/user/${
                    userType === 'Manager'
                        ? project.assignedTo
                        : project.assignedBy
                }`
            )
            .then((data) => {
                setUser(data.data);
            });
    }, [project, userType]);

    const onClick = () => {
        history.push(`/dashboard/${project._id}`);
    };

    return (
        <Fragment>
            <div className="project border-5 blur-md" onClick={() => onClick()}>
                <div className="lead-img">
                    <img
                        className="round-img is-profile-md"
                        src={user.avatar}
                        alt="Profile"
                    />
                </div>

                <div className="project-info">
                    <p className="team-lead md">
                        <strong>
                            {userType === 'Manager'
                                ? 'Team Lead:'
                                : 'Assigned By:'}
                        </strong>{' '}
                        {user.name}
                    </p>
                    <p className="email sm">
                        <strong>Email: </strong> {user.email}
                    </p>
                    <p>
                        <strong>Task Title: </strong> {project.title}
                    </p>
                    <p>
                        <strong>Task Description: </strong>{' '}
                        {project.description.length > 200
                            ? project.description.substring(0, 200) + '...'
                            : project.description}
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Project);
