import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { toggleProfileImage } from '../redux/auth/auth.actions';

import UploadImage from './upload-image';

const Profile = ({
    auth: { loading, currentUser, uploadPopup },
    projects: { projects },
    toggleProfileImage,
}) => {
    return (
        !loading && (
            <div className="profile border-5 bg-light blur-lg">
                <div
                    className="profile-img-div"
                    onClick={() => toggleProfileImage()}
                >
                    <img
                        className="profile-img round-img is-profile-lg"
                        src={currentUser.avatar}
                        alt="Profile"
                    />
                    <img
                        className="add-profile-img round-img is-profile-lg"
                        src="https://res.cloudinary.com/dcye5wp22/image/upload/v1624359786/plus-sign_af71m3.png"
                        alt="+"
                    />
                </div>
                {uploadPopup && <UploadImage />}
                <div className="profile-info">
                    <h1 className="lg">{currentUser.name}</h1>
                    <p className="lead">{currentUser.userType}</p>
                    <p>
                        <strong>Email: </strong>
                        {currentUser.email}
                    </p>
                    <p>
                        {currentUser.projects.length ? (
                            <Fragment>
                                <strong>No. of active projects: </strong>
                                <span>{projects.length}</span>
                            </Fragment>
                        ) : (
                            <strong>No active projects </strong>
                        )}
                    </p>
                </div>
            </div>
        )
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    projects: state.projects,
});

export default connect(mapStateToProps, { toggleProfileImage })(Profile);
