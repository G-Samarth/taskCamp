import { combineReducers } from 'redux';

import alertReducer from './alert/alert.reducer';
import authReducer from './auth/auth.reducer';
import projectsReducer from './projects/projects.reducer';
import projectInfoReducer from './project-info/project-info.reducer';

export default combineReducers({
    alert: alertReducer,
    auth: authReducer,
    projects: projectsReducer,
    projectInfo: projectInfoReducer,
});
