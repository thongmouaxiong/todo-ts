import {combineReducers} from 'redux'

import auth from './authReducer'
import alert from './alertReducer'
import task from './taskReducer'
import subTask from './subTaskReducer'
// import key from './getKey'
import{ task_info, sub_info, key, task_filter }from './getTaskInfo'

export default combineReducers({
    auth,
    alert,
    task,
    subTask,
    key,
    task_info,
    sub_info,
    task_filter
})