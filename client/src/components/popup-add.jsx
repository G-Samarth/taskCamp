import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { toggleResourceAdd } from '../redux/project-info/project-info.actions';
import { addResource } from '../redux/projects/projects.actions';

const PopupAdd = ({ match, toggleResourceAdd, addResource }) => {
    const [formData, setFormData] = useState({});

    const { taskTitle, taskDescription, resourceEmail } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        addResource(formData, match.params.projectId);
    };
    return (
        <div className="popup" id="popup-add">
            <div className="popup-card p-3 bg-white border-5">
                <div
                    className="popup-close"
                    onClick={() => toggleResourceAdd()}
                >
                    &times;
                </div>
                <h1 className="lead text-dark text-align">Add a Resource</h1>
                <form className="form-add" onSubmit={(e) => onSubmit(e)}>
                    <label for="email" className="form-add-label">
                        Email Address
                    </label>
                    <input
                        className="form-add-input blur-sm"
                        type="email"
                        placeholder="Email Address"
                        name="resourceEmail"
                        value={resourceEmail}
                        onChange={(e) => onChange(e)}
                        required
                    />

                    <label for="task-title" className="form-add-label">
                        Task Title
                    </label>
                    <input
                        className="form-add-input blur-sm"
                        type="text"
                        placeholder="Task Title"
                        name="taskTitle"
                        value={taskTitle}
                        onChange={(e) => onChange(e)}
                        required
                    />

                    <label for="task-desc" className="form-add-label">
                        Task Description
                    </label>
                    <textarea
                        className="form-add-input blur-sm"
                        placeholder="Task Description"
                        name="taskDescription"
                        rows="10"
                        value={taskDescription}
                        onChange={(e) => onChange(e)}
                        required
                    ></textarea>

                    <input
                        type="submit"
                        className="btn btn-primary blur-sm"
                        value="Add"
                    />
                </form>
            </div>
        </div>
    );
};

export default connect(null, { toggleResourceAdd, addResource })(
    withRouter(PopupAdd)
);
