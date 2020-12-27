import React from 'react';
import { connect } from 'react-redux';

import { toggleResourceAdd } from '../redux/project-info/project-info.actions';

const ResourceAdd = ({ toggleResourceAdd }) => {
    return (
        <div
            class="resource-section-add p-3 bg-white border-5 blur-md"
            onClick={() => toggleResourceAdd()}
        >
            <i class="fas fa-plus"></i>
        </div>
    );
};

export default connect(null, { toggleResourceAdd })(ResourceAdd);
