/**
 * Created by kenzhou on 4/26/16.
 */
import {get, post} from 'help/fetchHelp';
import _ from 'lodash';
import {combineReducers} from 'redux';
import {receiveObjToArr} from '../../utils/dataUtil';
const RECEIVE_JOBS = 'RECEIVE_JOBS';
const RECEIVE_JOB = 'RECEIVE_JOB';
const DELETE_JOB = 'DELETE_JOB';
const CHANGE_CLUSTERNAME = 'CHANGE_JOBCENTER_CLUSTERNAME';
const CHANGE_JOBNAME = 'CHANGE_JOBCENTER_JOBNAME';
const CHANGE_JOBOWNER = 'CHANGE_JOBOWNER';
const HANDLE_CLEAR = 'HANDLE_JOBCENTER_CLEAR';
const CHANGE_VALUE = 'CHANGE_JOBCENTER_VALUE';
const CHANGE_MODAL = 'CHANGE_JOBCENTER_MODAL';
const CHANGE_VISIBLE = 'CHANGE_JOBCENTER_VISIBLE';
const CHANGE_READONLY = 'CHANGE_JOBCENTER_READONLY';

export const transformObj = (obj)=> {
  _.merge(obj, {
    key: obj.jobName
  });
  return obj;
};

function transformJob(obj) {
  _.merge(obj, {
    key: obj.jobName
  });
}

function table(state = {
  jobs: [],
  isAdmin: false
}, action) {
  switch (action.type) {
    case RECEIVE_JOBS:
      return Object.assign({}, state, {jobs: action.jobs});
    case RECEIVE_JOB:
      return Object.assign({}, state, receiveObjToArr(state.jobs, transformObj(action.job), 'jobName', 'jobs'));
    case HANDLE_CLEAR:
      return Object.assign({}, state, {jobs: []});
    case DELETE_JOB:
      return Object.assign({}, state, {
        jobs: _.filter(state.jobs, (app)=> {
          return app.jobName !== action.job.jobName;
        })
      });
    default:
      return state;
  }
}

function searchBar(state = {
  queryInfo: {
    jobName: '',
    owner: ''
  },
}, action) {
  switch (action.type) {
    case CHANGE_CLUSTERNAME:
      return Object.assign({}, state, {queryInfo: _.merge({}, state.queryInfo, {clusterName: action.clusterName})});
    case CHANGE_JOBNAME :
      return Object.assign({}, state, {queryInfo: _.merge({}, state.queryInfo, {jobName: action.jobName})});
    case CHANGE_JOBOWNER :
      return Object.assign({}, state, {queryInfo: _.merge({}, state.queryInfo, {owner: action.owner})});
    case HANDLE_CLEAR:
      return Object.assign({}, state, {queryInfo: {jobName: ''}});
    default:
      return state;
  }
}

function modal(state = {
  visible: false,
  readOnly: false,
  modal: {}
}, action) {
  switch (action.type) {
    case CHANGE_VISIBLE:
      return Object.assign({}, state, {visible: action.visible});
    case CHANGE_READONLY:
      return Object.assign({}, state, {readOnly: action.readOnly});
    case CHANGE_VALUE :
      return Object.assign({}, state, {modal: _.merge({}, state.modal, _.set({}, action.path, action.value))});
    case CHANGE_MODAL:
      return Object.assign({},state, {modal: _.merge({},{disable:true},action.job)});
    default:
      return state;
  }
}

export const changeVisible = (visible) => ({
  type: CHANGE_VISIBLE,
  visible: visible
});

export const changeReadOnly = (readOnly) => ({
  type: CHANGE_READONLY,
  readOnly: readOnly
});

export const changeModal = (job) => ({
  type: CHANGE_MODAL,
  job: job
});

export const changeValue = (path, value) => ({
  type: CHANGE_VALUE,
  path: path,
  value: value
});

export const handleJobNameChange = (jobName) =>({
  type: CHANGE_JOBNAME,
  jobName: jobName
});

export const handleJobOwnerChange = (owner) =>({
  type: CHANGE_JOBOWNER,
  owner: owner
});

export const handleClusterNameChange = (clusterName) =>({
  type: CHANGE_CLUSTERNAME,
  clusterName: clusterName
});

export const handleClear = () =>({
  type: HANDLE_CLEAR
});

export const deleteJob = (job) => ({
  promise: post(`/cluster/${job.clusterName}/job/${job.jobName}/delete`, {}),
  type: DELETE_JOB,
  job: job,
  confirm: {title: '确定要删除吗?'}
});

const receiveJob = (job) => ({
  type: RECEIVE_JOB,
  job: job
});

const receiveJobs = (jobs) => ({
  type: RECEIVE_JOBS,
  jobs: jobs
});

export const insertOrUpdate = (param, event)=> {
  const copy = _.clone(param);
  const url = (event === 'update' ? `/cluster/${param.clusterName}/job/${param.jobName}/update` : `/cluster/${param.clusterName}/job/add`);
  return {
    promise: post(url, copy),
    onSuccess: (app, dispatch)=> {
      dispatch(receiveJob(app));
    }
  };
};

export const queryJob = (queryInfo) =>({
  promise: get(`/cluster/${queryInfo.clusterName}/job/search`, {
    queryJobName: queryInfo.jobName,
    queryOwner: queryInfo.owner
  }, true),
  onSuccess: (jobs, dispatch)=> {
    _.forEach(jobs, (obj)=> {
      transformJob(obj);
    });
    dispatch(receiveJobs(jobs));
  }
});


export default combineReducers({
  table, searchBar, modal
});
