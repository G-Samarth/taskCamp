import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(({ id, alertType, msg, wide }) => {
        return (
            <div className={`${wide && 'width-normal'}`}>
                <div
                    key={id}
                    className={`alert alert-${alertType} border-3 blur-sm`}
                >
                    {msg}
                </div>
            </div>
        );
    });

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
