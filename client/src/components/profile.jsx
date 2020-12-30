import React from 'react';
import { connect } from 'react-redux';

const Profile = ({ auth: { loading, currentUser } }) => {
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
                        <strong>No. of active projects: </strong>
                        {currentUser.projects.length}
                    </p>
                </div>
            </div>
        )
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
