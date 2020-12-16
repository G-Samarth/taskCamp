import React from 'react';

const ProjectInfo = ({ project: { description, title } }) => {
    
    return (
        <div class="project-section-top-info bg-primary p-4 border-10 blur-md">
            <h2 class="md">TASK</h2>
            <div>
                <p class="lead">
                    <strong>Task Title: </strong> {title}
                </p>
                <p class="lead">
                    <strong>Task Description: </strong> {description}
                </p>
            </div>
        </div>
    );
};

export default ProjectInfo;
