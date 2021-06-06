import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import {
    getProjectById,
    deleteProject,
} from '../redux/projects/projects.actions';
import { toggleEditMode } from '../redux/project-info/project-info.actions';

import Spinner from '../components/spinner';
import ProjectInfo from '../components/project-info';
import ProjectLead from '../components/project-lead';
import ResourceAdd from '../components/resource-add';
import PopupAdd from '../components/popup-add';
import PopupInfo from '../components/popup-info';
import Resource from '../components/resource';
import Button from '../components/button';
import Chat from '../components/chat';

const ProjectPage = ({
    match,
    history,
    getProjectById,
    deleteProject,
    toggleEditMode,
    projects: { project, loading },
    projectInfo: { popupInfo, popupAdd, editMode },
    auth: { currentUser, loading: authLoading },
}) => {
    useEffect(() => {
        !authLoading &&
            getProjectById(match.params.projectId, currentUser.userType);
    }, [getProjectById, match.params.projectId, currentUser, authLoading]);

    const handleClick = () => {
        deleteProject(match.params.projectId, currentUser.userType, history);
    };

    return project === null || loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <section className="project-section my-3">
                <div className="project-section-top">
                    <ProjectInfo project={project} />
                    <ProjectLead project={project} />
                </div>
            </section>

            {currentUser.userType !== 'Resource' && (
                <section className="resource-section">
                    {project.resources.map((resource) => (
                        <Resource key={resource._id} resource={resource} />
                    ))}
                    {!editMode && currentUser.userType === 'Lead' && (
                        <ResourceAdd />
                    )}
                    {popupAdd && currentUser.userType === 'Lead' && (
                        <PopupAdd />
                    )}
                    {popupInfo && <PopupInfo />}
                </section>
            )}
            {currentUser.userType === 'Manager' && (
                <Fragment>
                    <Button
                        className="btn btn-danger blur-sm my-3"
                        onClick={() => handleClick()}
                    >
                        Delete
                    </Button>
                    <Link
                        to={`/edit-project/${match.params.projectId}`}
                        className="btn btn-warning blur-sm my-3"
                    >
                        Edit
                    </Link>
                </Fragment>
            )}
            {currentUser.userType === 'Lead' && (
                <Button
                    className="btn btn-warning blur-sm my-3"
                    onClick={() => toggleEditMode()}
                >
                    Edit
                </Button>
            )}
            {!loading &&
                !authLoading &&
                currentUser.userType === 'Resource' && (
                    <Chat
                        leadId={project.assignedBy}
                        resourceId={currentUser._id}
                        projectId={match.params.projectId}
                    />
                )}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    projects: state.projects,
    projectInfo: state.projectInfo,
});

export default connect(mapStateToProps, {
    getProjectById,
    deleteProject,
    toggleEditMode,
})(withRouter(ProjectPage));
