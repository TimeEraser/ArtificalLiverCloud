/**
 * Created by kenzhou on 4/26/16.
 */
import {get, post} from '../../../help/fetchHelp';
import _ from 'lodash';
import {combineReducers} from 'redux';
import {updateObjToArr} from '../../utils/dataUtil';
import {Modal} from 'antd';
import React from 'react';
const RECEIVE_JOB = 'RECEIVE_JOB_DETAIL';
const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
const DELETE_SERVER = 'DELETE_SERVER';


const RECEIVE_JOBEXECUTESTATUS = 'RECEIVE_JOBEXECUTESTATUS';
const CHANGE_JOBEXECUTE_TIME_RANGE ='CHANGE_JOBEXECUTE_TIME_RANGE';
const CHANGE_JOBEXECUTE_LIMIT ='CHANGE_JOBEXECUTE_LIMIT';
const RECEIVE_SHARDINGS = 'RECEIVE_SHARDINGS';
const CHANGE_JOBDETAIL_READONLY = 'CHANGE_JOBDETAIL_READONLY';
const CHANGE_JOBDETAIL_VALUE = 'CHANGE_JOBDETAIL_VALUE';
const STOP_SERVER = 'STOP_SERVER';
const RESUME_SERVER = 'RESUME_SERVER';
const DISABLE_SERVER = 'DISABLE_SERVER';
const RELAUNCH_SERVER = 'RELAUNCH_SERVER';
const DELETE_OFFLINE_MACHINE = 'DELETE_OFFLINE_MACHINE';

import {notification} from 'antd';
function server(state = {
  servers: [],
  controller: "",
  isAdmin: false
}, action) {
  switch (action.type) {
    case RECEIVE_SERVERS:
      return Object.assign({}, state, {servers: action.servers});
    case DELETE_SERVER:
      return Object.assign({}, state, {
        servers: _.filter(state.servers, (app)=> {
          return app.host !== action.server.host;
        })
      });
    case DELETE_OFFLINE_MACHINE:
      return Object.assign({}, state, {
        servers: _.filter(state.servers, (app)=> {
          return app.host !== action.server.host;
        })
      });
    case STOP_SERVER:
      return Object.assign({}, state, updateObjToArr(state.servers, {
        host: action.server.host,
        stopped: 'stopped'
      }, 'host', 'servers'));
    case RESUME_SERVER:
      return Object.assign({}, state, updateObjToArr(state.servers, {
        host: action.server.host,
        stopped: null
      }, 'host', 'servers'));
    case DISABLE_SERVER:
      return Object.assign({}, state, updateObjToArr(state.servers, {
        host: action.server.host,
        disabled: 'disabled'
      }, 'host', 'servers'));
    case RELAUNCH_SERVER:
      return Object.assign({}, state, updateObjToArr(state.servers, {
        host: action.server.host,
        disabled: null
      }, 'host', 'servers'));
    default:
      return state;
  }
}
function jobExecuteHistory(state = {
  jobExecuteHistories:[],
  timeRange:"",
  limit:100,
}, action) {
  switch (action.type) {
    case RECEIVE_JOBEXECUTESTATUS:
      return Object.assign({}, state, {jobExecuteHistories: action.jobExecuteHistories});
    case CHANGE_JOBEXECUTE_TIME_RANGE:
      return Object.assign({}, state, {timeRange: action.timeRange});
    case CHANGE_JOBEXECUTE_LIMIT:
      return Object.assign({}, state, {limit: action.limit});
    default:
      return state;
  }
}
function sharding(state = {
  shardings: [],
  isAdmin: false
}, action) {
  switch (action.type) {
    case RECEIVE_SHARDINGS:
      return Object.assign({}, state, {shardings: action.shardings});
    default:
      return state;
  }
}

function job(state = {
  readOnly: true,
  job: {}
}, action) {
  switch (action.type) {
    case RECEIVE_JOB:
      return Object.assign({}, state, {job: action.job});
    case CHANGE_JOBDETAIL_READONLY:
      return Object.assign({}, state, {readOnly: action.readOnly});
    case CHANGE_JOBDETAIL_VALUE:
      const result = _.cloneDeep(state);
      _.set(result, action.path, action.value);
      return result;
    default:
      return state;
  }
}

function triggerTime(state = {
  triggerTimes: {}
}, action){
  switch (action.type){
    case RECEIVE_TRIGERTIME:
      return Object.assign({}, state, {triggerTimes: action.triggerTimes});
    default:
      return state;
  }

}

const receiveJob = (job) => ({
  type: RECEIVE_JOB,
  job: job
});

const receiveServers = (servers) => ({
  type: RECEIVE_SERVERS,
  servers: servers
});

const receiveShardings = (shardings) => ({
  type: RECEIVE_SHARDINGS,
  shardings: shardings
});

const receiveTriggerTimes = (triggerTimes) => ({
  type: RECEIVE_TRIGGERTIMES,
  triggerTimes: triggerTimes
})

const receiveJobExecuteHistories= (jobExecuteHistories) =>({
  type: RECEIVE_JOBEXECUTESTATUS,
  jobExecuteHistories:jobExecuteHistories,
});
const openNotificationWithIcon = function (type,title,msg) {
  const argsDefault = {
    message: '系统错误',
    description: '请联系管理员',
    duration: 2,
  }
  const args = {
    message: title,
    description: msg,
    duration: 2,
  };
  switch (type){
    case 'success': notification.success(args); break;
    case 'failure':notification.error(args); break;
    default : notification.error(argsDefault);
  }
};
export const changeExecuteTimeRange = (timeRange) => ({
  type: CHANGE_JOBEXECUTE_TIME_RANGE,
  timeRange: timeRange
});
export const changeExecuteLimit = (limit) => ({
  type: CHANGE_JOBEXECUTE_LIMIT,
  limit: limit
});

export const changeValue = (path, value) => ({
  type: CHANGE_JOBDETAIL_VALUE,
  path: path,
  value: value
});

export const changeReadOnly = (readOnly) => ({
  type: CHANGE_JOBDETAIL_READONLY,
  readOnly: readOnly
});

export const getJobByClusterAndJobName = (queryInfo) =>({
  promise: get(`/cluster/${queryInfo.clusterName}/job/${queryInfo.jobName}/detail`, false),
  onSuccess: (job, dispatch)=> {
    transformJob(job);
    dispatch(receiveJob(job));
  }
});

export const getServers = (job) =>({
  promise: get(`/cluster/${job.clusterName}/job/${job.jobName}/server/findAll`, false),
  onSuccess: (servers, dispatch)=> {
    _.forEach(servers, (obj)=> {
      transformServer(servers);
    });
    dispatch(receiveServers(servers));
  }
});

export const getShardings = (job) =>({
  promise: get(`/cluster/${job.clusterName}/job/${job.jobName}/runtime/findAll`, false),
  onSuccess: (shardings, dispatch)=> {
    _.forEach(shardings, (obj)=> {
      transformSharding(shardings);
    });
    dispatch(receiveShardings(shardings));
  }
});


export const getTriggerTime = (job) => {
  return {
    promise: get(`/cluster/${job.clusterName}/job/${job.jobName}/nextCronTime`,false),
    onSuccess : (data) => {
      Modal.info({
        title:'未来五次触发时间',
        content: (
          <div>
            {
              _.map(data, (record, index) => {
                return (
                  <p key={index + record}>{record}</p>
                );
              })
            }
          </div>
        )
      });
    }
  };
};

export const getJobExecuteHistories = (param)=> {
  const copy = _.clone(param);
  const url = (`/cluster/${param.clusterName}/job/${param.jobName}/execute/search`);
  return {
    promise: post(url, copy),
    onSuccess: (jobExecuteHistories, dispatch)=> {
      _.forEach(jobExecuteHistories, (obj)=> {
        transformJobExecuteHistory(jobExecuteHistories);
      });
      dispatch(receiveJobExecuteHistories(jobExecuteHistories));
    },
    onFailure:()=> {
      openNotificationWithIcon("failure",'系统异常','获取Job执行状态失败')
    }
  };
};

export const updateJob = (param)=> {
  const copy = _.clone(param);
  const url = (`/cluster/${param.clusterName}/job/${param.jobName}/update`);
  return {
    promise: post(url, copy),
    onSuccess: (job, dispatch)=> {
      openNotificationWithIcon("success",'更新成功',param.clusterName+'->'+param.jobName+':'+'已经更新')
      dispatch(receiveJob(job));
    },
    onFailure:()=> {
      openNotificationWithIcon("failure",'更新失败',param.clusterName+'->'+param.jobName+':'+'更新失败')
    }
  };
};
export const updateJobExecuteHistory = (param)=> {
  const copy = _.clone(param);
  const url = (`/cluster/${param.clusterName}/job/${param.jobName}/execute/search`);
  return {
    promise: post(url, copy),
    onSuccess: (jobExecuteHistories, dispatch)=> {
      _.forEach(jobExecuteHistories, (obj)=> {
        transformJobExecuteHistory(jobExecuteHistories);
      });
      dispatch(receiveJobExecuteHistories(jobExecuteHistories));
    },
    onFailure:()=> {
      openNotificationWithIcon("failure",'系统异常','获取Job执行状态失败')
    }
  };
};
export const deleteServer = (param)=>( {
  promise: post(`/cluster/${param.job.clusterName}/job/${param.job.jobName}/server/${param.server.host}/delete`),
  type: DELETE_SERVER,
  server: param.server,
  confirm: {title: '确定要删除吗?'}
});

export const deleteOfflineMachine = (param)=>( {
  promise: post(`/cluster/${param.job.clusterName}/job/${param.job.jobName}/server/${param.server.host}/deleteOfflineMachine`),
  type: DELETE_OFFLINE_MACHINE,
  server: param.server,
  confirm: {title: '确定要删除吗?'}
})

export const stopServer = (param)=>( {
  promise: post(`/cluster/${param.job.clusterName}/job/${param.job.jobName}/server/${param.server.host}/stop`),
  type: STOP_SERVER,
  server: param.server,
  confirm: {title: '确定要暂停吗?'}
});

export const resumeServer = (param)=>( {
  promise: post(`/cluster/${param.job.clusterName}/job/${param.job.jobName}/server/${param.server.host}/resume`),
  type: RESUME_SERVER,
  server: param.server,
  confirm: {title: '确定要恢复吗?'}
});

export const disableServer = (param)=>( {
  promise: post(`/cluster/${param.job.clusterName}/job/${param.job.jobName}/server/${param.server.host}/disable`),
  type: DISABLE_SERVER,
  server: param.server,
  confirm: {title: '确定要终止该机器吗?'}
});

export const relaunchServer = (param)=>( {
  promise: post(`/cluster/${param.job.clusterName}/job/${param.job.jobName}/server/${param.server.host}/relaunch`),
  type: RELAUNCH_SERVER,
  server: param.server,
  confirm: {title: '确定要重启用该机器吗?'}
});

function transformSharding(obj) {
  _.merge(obj, {
    key: obj.item
  });
}

function transformServer(obj) {
  _.merge(obj, {
    key: obj.host
  });
}

function transformJob(obj) {
  _.merge(obj, {
    key: obj.jobName
  });
}
function transformJobExecuteHistory(obj) {
  _.merge(obj, {
    key: obj.jobId
  });
}
export default combineReducers({
  server, sharding, job ,jobExecuteHistory
});
