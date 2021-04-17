import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllProjects } from '../redux/projects/projects.actions';

import Spinner from '../components/spinner';
import ProfileComponent from '../components/profile';
import ProjectComponent from '../components/project';

const ProfilePage = ({
    getAllProjects,
    auth: { currentUser, loading: authLoading },
    projects: { projects, loading },
}) => {
    useEffect(() => {
        !authLoading && getAllProjects(currentUser.userType);
    }, [getAllProjects, authLoading, currentUser]);

    return loading && projects.length === 0 ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="width-normal">
                <ProfileComponent />
                {projects.map((project) => (
                    <ProjectComponent
                        key={project._id}
                        project={project}
                        userType={currentUser.userType}
                    />
                ))}
                {currentUser?.userType === 'Manager' ? (
                    <Link to="/add-project">
                        <div className="project-add border-5 blur-lg">
                            <i className="fas fa-plus"></i>
                        </div>
                    </Link>
                ) : null}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    projects: state.projects,
});

export default connect(mapStateToProps, { getAllProjects })(ProfilePage);
