import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { createProject } from '../redux/projects/projects.actions';

const EditProjectForm = ({ history, match, createProject }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        email: '',
    });

    useEffect(() => {
        async function fetchData() {
            let title = '',
                description = '',
                email = '';
            await axios
                .get(`/manager/projects/${match.params.projectId}`)
                .then(async (data) => {
                    title = data.data.title;
                    description = data.data.description;
                    await axios
                        .get(`/auth/user/${data.data.assignedTo}`)
                        .then((data) => {
                            email = data.data.email;
                        });
                });
            setFormData({
                title: title,
                description: description,
                leadEmail: email,
            });
        }
        fetchData();
    }, [match.params.projectId]);

    const { title, description, leadEmail } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createProject(formData, history, match.params.projectId, true);
    };

    return (
        <Fragment>
            <div className="form-project p-3 bg-white border-5">
                <h1 className="lead text-dark text-align">Edit Project</h1>
                <form className="form-add" onSubmit={(e) => onSubmit(e)}>
                    <label className="form-add-label">Task Title</label>
                    <input
                        className="form-add-input blur-sm"
                        type="text"
                        placeholder="Task Title"
                        name="title"
                        value={title}
                        onChange={(e) => onChange(e)}
                        required
                    />

                    <label className="form-add-label">Task Description</label>
                    <textarea
                        className="form-add-input blur-sm"
                        placeholder="Task Description"
                        name="description"
                        value={description}
                        onChange={(e) => onChange(e)}
                        rows="10"
                        required
                    ></textarea>

                    <label className="form-add-label">Lead's Email</label>
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
                        value="Save"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default connect(null, { createProject })(withRouter(EditProjectForm));
