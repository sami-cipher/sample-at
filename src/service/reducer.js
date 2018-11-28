import actionTypes from './actionType';
import { header } from '../asset/configUrl' 

const initialState = {
  timesheets: [],
  activityList: [],
  projectList: [],
  configHeader: header
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_ACTIVITIES_SUCCESS:
      return({
        ...state,
        activityList: action.data
      })
    case actionTypes.GET_PROJECTS_SUCCESS:
      return({
        ...state,
        projectList: action.data
      })
    case actionTypes.GET_TIMESHEET_SUCCESS:
      return({
        ...state,
        timesheets: action.data.timesheets
      })
    case actionTypes.UPDATE_CONFIG_SUCCESS:
      return({
        ...state,
        configHeader: {
          ...state.configHeader,
          ...action.data
        }
      })

    default: 
      return state;
  }
}
export default reducer;