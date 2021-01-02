import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createProject } from '../redux/projects/projects.actions';

const ProjectForm = ({ history, createProject }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        email: '',
    });

    const { title, description, leadEmail } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createProject(formData, history);
    };

    return (
        <Fragment>
            <div className="form-project p-3 bg-white border-5">
                <h1 className="lead text-dark text-align">
                    Create a new Project
                </h1>
                <form className="form-add" onSubmit={(e) => onSubmit(e)}>
                    <label for="task-title" className="form-add-label">
                        Task Title
                    </label>
                    <input
                        className="form-add-input blur-sm"
                        type="text"
                        placeholder="Task Title"
                        name="title"
                        value={title}
                        onChange={(e) => onChange(e)}
                        required
                    />

                    <label for="task-desc" className="form-add-label">
                        Task Description
                    </label>
                    <textarea
                        className="form-add-input blur-sm"
                        placeholder="Task Description"
                        name="description"
                        value={description}
                        onChange={(e) => onChange(e)}
                        rows="10"
                        required
                    ></textarea>

                    <label for="email" className="form-add-label">
                        Lead's Email
                    </label>
                    <input
                        className="form-add-input blur-sm"
                        type="email"
                        placeholder="Email Address"
                        name="leadEmail"
                        value={leadEmail}
                        onChange={(e) => onChange(e)}
                    />

                    <input
                        type="submit"
                        className="btn btn-primary blur-sm"
                        value="Add"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default connect(null, { createProject })(withRouter(ProjectForm));
