import React, { useState } from 'react';
import { connect } from 'react-redux';

import { toggleResourceAdd } from '../redux/project-info/project-info.actions';

const PopupAdd = ({ toggleResourceAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        email: '',
    });

    const { title, description, resEmail } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <div class="popup" id="popup-add">
            <div class="popup-card p-3 bg-white border-5">
                <div class="popup-close" onClick={() => toggleResourceAdd()}>
                    &times;
                </div>
                <h1 class="lead text-dark text-align">Add a Resource</h1>
                <form class="form-add" onSubmit={(e) => onSubmit(e)}>
                    <label for="email" class="form-add-label">
                        Email Address
                    </label>
                    <input
                        class="form-add-input blur-sm"
                        type="email"
                        placeholder="Email Address"
                        name="resEmail"
                        value={resEmail}
                        onChange={(e) => onChange(e)}
                        required
                    />

                    <label for="task-title" class="form-add-label">
                        Task Title
                    </label>
                    <input
                        class="form-add-input blur-sm"
                        type="text"
                        placeholder="Task Title"
                        name="title"
                        value={title}
                        onChange={(e) => onChange(e)}
                        required
                    />

                    <label for="task-desc" class="form-add-label">
                        Task Description
                    </label>
                    <textarea
                        class="form-add-input blur-sm"
                        placeholder="Task Description"
                        name="description"
                        rows="10"
                        value={description}
                        onChange={(e) => onChange(e)}
                        required
                    ></textarea>

                    <input
                        type="submit"
                        class="btn btn-primary blur-sm"
                        value="Add"
                    />
                </form>
            </div>
        </div>
    );
};

export default connect(null, { toggleResourceAdd })(PopupAdd);
