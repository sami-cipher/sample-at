import axios from "axios";
import { keysIn as _keysIn,
  map as _map,
  split as _split,
  join as _join } from 'lodash';
import SERVICE_URL from '../asset/configUrl';
import actionType from "./actionType";

export const getActivities = (config) => dispatch => {

  return axios.get(SERVICE_URL.getActivities, {
    headers: config
  }).then(response => {
      
    return dispatch({
      type: actionType.GET_ACTIVITIES_SUCCESS,
      data: response.data.result
    })
  })
};

export const getProjects = (config) => dispatch => {

   return axios.get(SERVICE_URL.getProjects, {
    headers: config
  }).then(response => {
    
    return dispatch({
      type: actionType.GET_PROJECTS_SUCCESS,
      data: response.data.result
    })
  })
};

export const getTimesheet = (config, data) => dispatch => {
  const keys = _keysIn(data);
  const urlString = _join(_map(keys, key => {
    const val = _join(_split(data[key], ' '), '%20')
    return `${key}=${val}`
  }), '&')

  console.log('urlString..', urlString)

  return axios.get(SERVICE_URL.getTimesheet + `?${urlString}`, {
    headers: config
  }).then(response => {
    
    return dispatch({
      type: actionType.GET_TIMESHEET_SUCCESS,
      data: response.data.result
    })
 })
};
export const updateConfig = (data) => dispatch => {
    
    return dispatch({
      type: actionType.UPDATE_CONFIG_SUCCESS,
      data: data
    })
};
