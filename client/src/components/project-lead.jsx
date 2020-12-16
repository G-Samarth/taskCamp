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
            <div class="project-section-top-lead bg-primary p-3 border-10 blur-md">
                <h2 class="md">LEAD</h2>
                <div>
                    <img
                        class="round-img"
                        src={lead.avatar}
                        alt="Profile Picture"
                    />
                    <p class="lead lead-name">{lead.name}</p>
                    <p class="lead">{lead.email}</p>
                </div>
            </div>
        )
    );
};

const mapStateToProps = (state) => ({
    lead: state.projectInfo,
});

export default connect(mapStateToProps, { getLead })(ProjectLead);
