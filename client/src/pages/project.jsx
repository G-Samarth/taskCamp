import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProjectById } from '../redux/projects/projects.actions';

import Spinner from '../components/spinner';
import ProjectInfo from '../components/project-info';
import ProjectLead from '../components/project-lead';
import ResourceAdd from '../components/resource-add';
import PopupAdd from '../components/popup-add';

const ProjectPage = ({
    match,
    getProjectById,
    projects: { project, loading },
    showPopup,
}) => {
    useEffect(() => {
        getProjectById(match.params.projectId);
    }, [getProjectById, match.params.projectId]);

    return project === null || loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <section class="project-section my-3">
                <div class="project-section-top">
                    <ProjectInfo project={project} />
                    <ProjectLead project={project} />
                </div>
            </section>

            <section class="resource-section">
                <a href="#popup">
                    <div class="resource-section-card p-3 bg-white border-5 blur-md">
                        <div class="resource-section-card-info">
                            <img
                                class="round-img"
                                src="../dist/img/resource.png"
                                alt="Profile Picture"
                            />
                            <p>Resource1</p>
                            <p>res1@gmail.com</p>
                        </div>
                        <div class="resource-section-card-task">
                            <p>
                                <strong>Task Title:</strong> Frontend Team
                            </p>
                            <p>
                                <strong>Task Description:</strong> Lorem ipsum
                                dolor sit amet consectetur adipisicing elit.
                                Dolor, est.
                            </p>
                        </div>
                    </div>
                </a>
                <ResourceAdd />
                {showPopup && <PopupAdd />}
            </section>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects,
    showPopup: state.projectInfo.popupAdd,
});

export default connect(mapStateToProps, { getProjectById })(
    withRouter(ProjectPage)
);
