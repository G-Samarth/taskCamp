import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Profile = ({
    auth: { loading, currentUser },
    projects: { projects },
}) => {
    return (
        !loading && (
            <div className="profile border-5 bg-light blur-lg">
                <div className="profile-img">
                    <img
                        className="round-img"
                        src={currentUser.avatar}
                        alt="Profile"
                    />
                </div>
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

export default connect(mapStateToProps)(Profile);
