import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getLeadOrManager } from '../redux/project-info/project-info.actions';

const ProjectLead = ({
    project: { assignedTo, assignedBy },
    getLeadOrManager,
    leadOrManager: { leadOrManager, loading },
    auth: { currentUser, loading: authLoading },
}) => {
    useEffect(() => {
        !authLoading &&
            getLeadOrManager(
                currentUser.userType === 'Manager' ? assignedTo : assignedBy
            );
    }, [getLeadOrManager, assignedTo, assignedBy, currentUser, authLoading]);

    return (
        !loading && (
            <div className="project-section-top-lead bg-primary p-3 border-10 blur-md">
                <h2 className="md">
                    {currentUser.userType === 'Manager'
                        ? 'TEAM LEAD'
                        : 'ASSIGNED BY'}
                </h2>
                <div>
                    <img
                        className="round-img is-profile-md"
                        src={leadOrManager.avatar}
                        alt="Profile"
                    />
                    <p className="lead lead-name">{leadOrManager.name}</p>
                    <p className="lead">{leadOrManager.email}</p>
                </div>
            </div>
        )
    );
};

const mapStateToProps = (state) => ({
    leadOrManager: state.projectInfo,
    auth: state.auth,
});

export default connect(mapStateToProps, { getLeadOrManager })(ProjectLead);
