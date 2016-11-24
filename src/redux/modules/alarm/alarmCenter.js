import {get, post} from '../../../help/fetchHelp';
import _ from 'lodash';
import {combineReducers} from 'redux';
import React from 'react';
import {notification} from 'antd';



const RECEIVE_ALARM_DATA = "RECEIVE_ALARM_DATA";
const SEND_ALARM_DATA = "SEND_ALARM_DATA";
const UPDATE_ALARM_DATA_LOCAL = 'UPDATE_ALARM_DATA_LOCAL';

const SET_DIRTY = 'SET_DIRTY';
const RESET_DIRTY = 'RESET_DIRTY';


export const defaultAlarmData = [
  {
    key: 1,
    name: '心率',
    floor: 32,
    ceiling: 33,
    type: 1,
  }, {
    key: 2,
    name: '收缩压',
    floor: 42,
    ceiling: 47,
    type: 1,
  }, {
    key: 3,
    name: '舒张压',
    floor: 32,
    ceiling: 47,
    type: 1,
  }, {
    key: 4,
    name: '血氧',
    floor: 32,
    ceiling: 47,
    type: 1,
  }, {
    key: 5,
    name: '采血压',
    floor: 32,
    ceiling: 47,
    type: 2,
  }, {
    key: 6,
    name: '血浆入口压',
    floor: 32,
    ceiling: 47,
    type: 2,
  }, {
    key: 7,
    name: '动脉压',
    floor: 32,
    ceiling: 47,
    type: 2,
  }, {
    key: 8,
    name: '静脉压',
    floor: 32,
    ceiling: 47,
    type: 2,
  }, {
    key: 9,
    name: '血浆压',
    floor: 32,
    ceiling: 47,
    type: 2,
  }, {
    key: 10,
    name: '跨膜压',
    floor: 32,
    ceiling: 47,
    type: 2,
  }, {
    key: 11,
    name: '累计时间',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 12,
    name: '血泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 13,
    name: '分离泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 14,
    name: '透析泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 15,
    name: '废液泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 16,
    name: '过滤泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 17,
    name: '累计泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 18,
    name: '肝素泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 19,
    name: '加热温度',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 20,
    name: '血液泵累计',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 21,
    name: 'FP累计',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 22,
    name: 'DP累计',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 23,
    name: 'RP累计',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 24,
    name: 'FP2累计',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 25,
    name: 'CP累计',
    floor: 32,
    ceiling: 47,
    type: 3,
  }, {
    key: 26,
    name: 'SP累计',
    floor: 32,
    ceiling: 47,
    type: 3,
  }];
export const defaultAlarmData2 = {
  heartRate:{
    id: 1,
    alarmItem: '心率',
    floor: 32,
    ceiling: 33,
    type: 1,
  },
  systolicPressure: {
    id: 2,
    alarmItem: '收缩压',
    floor: 42,
    ceiling: 47,
    type: 1,
  },
  diastolicPressure: {
    id: 3,
    alarmItem: '舒张压',
    floor: 32,
    ceiling: 47,
    type: 1,
  },
  bloodOxygen: {
    id: 4,
    alarmItem: '血氧',
    floor: 32,
    ceiling: 47,
    type: 1,
  },
  inBloodPressure:{
    id: 5,
    alarmItem: '采血压',
    floor: 32,
    ceiling: 47,
    type: 2,
  },
  plasmaInletPressure: {
    id: 6,
    alarmItem: '血浆入口压',
    floor: 32,
    ceiling: 47,
    type: 2,
  },
  arterialPressure: {
    id: 7,
    alarmItem: '动脉压',
    floor: 32,
    ceiling: 47,
    type: 2,
  },
  venousPressure:{
    id: 8,
    alarmItem: '静脉压',
    floor: 32,
    ceiling: 47,
    type: 2,
  },
  plasmaPressure:{
    id: 9,
    alarmItem: '血浆压',
    floor: 32,
    ceiling: 47,
    type: 2,
  },
  transmembranePressure:{
    id: 10,
    alarmItem: '跨膜压',
    floor: 32,
    ceiling: 47,
    type: 2,
  },
  // cumulativeTime:{
  //   id: 11,
  //   alarmItem: '累计时间',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 3,
  // },
  bloodPump:{
    id: 12,
    alarmItem: '血泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  },
  separationPump:{
    id: 13,
    alarmItem: '分离泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  },
  dialysisPump:{
    id: 14,
    alarmItem: '透析泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  },
  tripePump:{
    id: 15,
    alarmItem: '废液泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  },
  filtrationPump:{
    id: 16,
    alarmItem: '过滤泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  },
  circulatingPump:{
    id: 17,
    alarmItem: '累计泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  },
  heparinPump: {
    id: 18,
    alarmItem: '肝素泵',
    floor: 32,
    ceiling: 47,
    type: 3,
  },
  warmer: {
    id: 19,
    alarmItem: '加热温度',
    floor: 32,
    ceiling: 47,
    type: 3,
  },
  // bloodPumpT: {
  //   id: 20,
  //   alarmItem: '血液泵累计',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 3,
  // },
  // separationPumpT: {
  //   id: 21,
  //   alarmItem: 'FP累计',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 3,
  // },
  // tripePumpT: {
  //   id: 23,
  //   alarmItem: 'RP累计',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 3,
  // },
  // filtrationPumpT:{
  //   id: 24,
  //   alarmItem: 'FP2累计',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 3,
  // },
  // circulatingPumpT: {
  //   id: 25,
  //   alarmItem: 'CP累计',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 3,
  // },
  // heparinPumpT:{
  //   id: 26,
  //   alarmItem: 'SP累计',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 3,
  // },
  // p1:{
  //   id: 27,
  //   alarmItem: 'p1',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 1,
  // },
  // p2:{
  //   id: 28,
  //   alarmItem: 'p2',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 1,
  // },
  // p3:{
  //   id: 29,
  //   alarmItem: 'p3',
  //   floor: 32,
  //   ceiling: 47,
  //   type: 1,
  // }
};

//action
export const receiveAlarmData= (alarmData) => ({
  type: RECEIVE_ALARM_DATA,
  alarmData: alarmData,
});
export const sendAlarmData= (alarmData) => ({
  type: SEND_ALARM_DATA,
  alarmData: alarmData,
});
export const updateAlarmDataLocal =(alarmData)=> ({
  type: UPDATE_ALARM_DATA_LOCAL,
  alarmData: alarmData,
});

export const setDirtyAction = ()=> ({
  type: SET_DIRTY,
  dirty: true,
});
export const resetDirtyAction = ()=> ({
  type: RESET_DIRTY,
  dirty: false,
});
//function

export const sendAlarmDataFunction =(param)=> {
  const copy = _.clone(param);
  const url = ('/alarm/updateAlarmSetting');
  return {
    promise: post(url, copy),
    onSuccess: (result, dispatch) => {
      dispatch(sendAlarmData(result))
      resetDirtyAction();
    }
  }
};
export const receiveAlarmDataFunction =(param)=> {
  const copy = _.clone(param);
  const url = ('/alarm/getAll');
  return {
    promise: post(url, copy),
    onSuccess: (result, dispatch) => {
      dispatch(receiveAlarmData(result))
      resetDirtyAction();
    }
  }
};


//reducer
function data(state= {alarmData: {}}, action) {
  switch (action.type){
    case UPDATE_ALARM_DATA_LOCAL: {
      return Object.assign({}, state, {alarmData:action.alarmData});
    }
    case RECEIVE_ALARM_DATA: {
      return Object.assign({}, state, {alarmData: action.alarmData});
    }
    case SEND_ALARM_DATA: {
      return Object.assign({}, state, {alarmData: action.alarmData});
    }
    default:{
      return state;
    }
  }
}
function dirty(state= {dirty: false}, action) {
  switch (action.type){
    case SET_DIRTY: {
      return Object.assign({},state,{dirty:action.dirty});
    }
    case RESET_DIRTY: {
      return Object.assign({}, state, {dirty: action.dirty});
    }
    default:{
      return state;
    }
  }
}
export default combineReducers({
  data,dirty
})


