import React from 'react';

const ProjectInfo = ({ project: { description, title } }) => {
    return (
        <div className="project-section-top-info bg-primary p-4 border-10 blur-md">
            <h2 className="md">TASK</h2>
            <div>
                <p className="lead">
                    <strong>Task Title: </strong> {title}
                </p>
                <p className="lead">
                    <strong>Task Description: </strong> {description}
                </p>
            </div>
        </div>
    );
};

export default ProjectInfo;
