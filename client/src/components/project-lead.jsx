import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getLead } from '../redux/project-info/project-info.actions';

const ProjectLead = ({
    project: { assignedTo },
    getLead,
    lead: { lead, loading },
}) => {
    useEffect(() => {
        getLead(assignedTo);
    }, [getLead, assignedTo]);

    return (
        !loading && (
            <div className="project-section-top-lead bg-primary p-3 border-10 blur-md">
                <h2 className="md">LEAD</h2>
                <div>
                    <img
                        className="round-img"
                        src={lead.avatar}
                        alt="Profile"
                    />
                    <p className="lead lead-name">{lead.name}</p>
                    <p className="lead">{lead.email}</p>
                </div>
            </div>
        )
    );
};

const mapStateToProps = (state) => ({
    lead: state.projectInfo,
});

export default connect(mapStateToProps, { getLead })(ProjectLead);
