import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
        return (
            <div className={`alert alert-${alert.alertType} border-3 blur-sm`}>
                {alert.msg}
            </div>
        );
    });

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
