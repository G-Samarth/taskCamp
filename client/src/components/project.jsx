import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

const Project = ({ history, project }) => {
    const [lead, setLead] = useState({
        name: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        axios.get(`/auth/user/${project.assignedTo}`).then((data) => {
            setLead(data.data);
        });
    }, [project.assignedTo]);

    const onClick = () => {
        history.push(`/dashboard/${project._id}`);
    };

    return (
        <Fragment>
            <div className="project border-5 blur-md" onClick={() => onClick()}>
                <div className="lead-img">
                    <img
                        className="round-img"
                        src={lead.avatar}
                        alt="Profile"
                    />
                </div>

                <div className="project-info">
                    <p className="md">
                        <strong>Lead: </strong> {lead.name}
                    </p>
                    <p className="email sm">
                        <strong>Email: </strong> {lead.email}
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
