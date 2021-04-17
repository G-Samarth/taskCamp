import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProjectById } from '../redux/projects/projects.actions';
import { deleteProject } from '../redux/projects/projects.actions';

import Spinner from '../components/spinner';
import ProjectInfo from '../components/project-info';
import ProjectLead from '../components/project-lead';
import ResourceAdd from '../components/resource-add';
import PopupAdd from '../components/popup-add';
import PopupInfo from '../components/popup-info';
import Resource from '../components/resource';
import Button from '../components/button';

const ProjectPage = ({
    match,
    history,
    getProjectById,
    deleteProject,
    projects: { project, loading },
    showPopupAdd,
    showPopupInfo,
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
                        <Resource resource={resource} />
                    ))}
                    {currentUser.userType === 'Lead' && <ResourceAdd />}
                    {showPopupAdd && currentUser.userType === 'Lead' && (
                        <PopupAdd />
                    )}
                    {showPopupInfo && <PopupInfo />}
                </section>
            )}
            {currentUser.userType === 'Manager' && (
                <Button
                    className="btn btn-danger blur-sm my-3"
                    onClick={() => handleClick()}
                >
                    Delete
                </Button>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    projects: state.projects,
    showPopupAdd: state.projectInfo.popupAdd,
    showPopupInfo: state.projectInfo.popupInfo,
});

export default connect(mapStateToProps, { getProjectById, deleteProject })(
    withRouter(ProjectPage)
);
