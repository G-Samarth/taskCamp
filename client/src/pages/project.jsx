import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProjectById } from '../redux/projects/projects.actions';

import Spinner from '../components/spinner';
import ProjectInfo from '../components/project-info';
import ProjectLead from '../components/project-lead';

const ProjectPage = ({
    match,
    getProjectById,
    projects: { project, loading },
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
                <div class="resource-section-card p-3 bg-white border-5 blur-md">
                    <div class="resource-section-card-info">
                        <img
                            class="round-img"
                            src="../dist/img/resource.png"
                            alt="Profile Picture"
                        />
                        <p>Resource2</p>
                        <p>res2@gmail.com</p>
                    </div>
                    <div class="resource-section-card-task">
                        <p>
                            <strong>Task Title:</strong> Frontend Team
                        </p>
                        <p>
                            <strong>Task Description:</strong> Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Dolor, est.
                        </p>
                    </div>
                </div>
                <div class="resource-section-card p-3 bg-white border-5 blur-md">
                    <div class="resource-section-card-info">
                        <img
                            class="round-img"
                            src="../dist/img/resource.png"
                            alt="Profile Picture"
                        />
                        <p>Resource3</p>
                        <p>res3@gmail.com</p>
                    </div>
                    <div class="resource-section-card-task">
                        <p>
                            <strong>Task Title:</strong> Backend Team
                        </p>
                        <p>
                            <strong>Task Description:</strong> Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Dolor, est.
                        </p>
                    </div>
                </div>
                <div class="resource-section-card p-3 bg-white border-5 blur-md">
                    <div class="resource-section-card-info">
                        <img
                            class="round-img"
                            src="../dist/img/resource.png"
                            alt="Profile Picture"
                        />
                        <p>Resource4</p>
                        <p>res4@gmail.com</p>
                    </div>
                    <div class="resource-section-card-task">
                        <p>
                            <strong>Task Title:</strong> Backend Team
                        </p>
                        <p>
                            <strong>Task Description:</strong> Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Dolor, est.
                        </p>
                    </div>
                </div>
                <div class="resource-section-card p-3 bg-white border-5 blur-md">
                    <div class="resource-section-card-info">
                        <img
                            class="round-img"
                            src="../dist/img/resource.png"
                            alt="Profile Picture"
                        />
                        <p>Resource5</p>
                        <p>res5@gmail.com</p>
                    </div>
                    <div class="resource-section-card-task">
                        <p>
                            <strong>Task Title:</strong> Backend Team
                        </p>
                        <p>
                            <strong>Task Description:</strong> Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Dolor, est.
                        </p>
                    </div>
                </div>
                <a href="#popup-add">
                    <div class="resource-section-add p-3 bg-white border-5 blur-md">
                        <i class="fas fa-plus"></i>
                    </div>
                </a>
            </section>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects,
});

export default connect(mapStateToProps, { getProjectById })(
    withRouter(ProjectPage)
);
