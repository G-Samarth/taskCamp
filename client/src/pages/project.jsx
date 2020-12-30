import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProjectById } from '../redux/projects/projects.actions';

import Spinner from '../components/spinner';
import ProjectInfo from '../components/project-info';
import ProjectLead from '../components/project-lead';
import ResourceAdd from '../components/resource-add';
import PopupAdd from '../components/popup-add';
import PopupInfo from '../components/popup-info';
import Resource from '../components/resource';

const ProjectPage = ({
    match,
    getProjectById,
    projects: { project, loading },
    showPopupAdd,
    showPopupInfo,
    auth: { currentUser },
}) => {
    useEffect(() => {
        getProjectById(match.params.projectId);
    }, [getProjectById, match.params.projectId]);

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

            <section className="resource-section">
                {project.resources.map((resource) => (
                    <Resource resource={resource} />
                ))}
                {currentUser === 'Lead' && <ResourceAdd />}
                {showPopupAdd && currentUser === 'Lead' && <PopupAdd />}
                {showPopupInfo && <PopupInfo />}
            </section>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    projects: state.projects,
    showPopupAdd: state.projectInfo.popupAdd,
    showPopupInfo: state.projectInfo.popupInfo,
});

export default connect(mapStateToProps, { getProjectById })(
    withRouter(ProjectPage)
);
