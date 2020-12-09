import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProjectById } from '../redux/projects/projects.actions';

import Spinner from '../components/spinner';

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
            <h1>Project</h1>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects,
});

export default connect(mapStateToProps, { getProjectById })(
    withRouter(ProjectPage)
);
