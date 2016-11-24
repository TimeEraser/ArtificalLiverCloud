

/**
 * Created by reky on 2016/11/10.
 */
import {get, post} from '../../../help/fetchHelp';
import _ from 'lodash';
import {combineReducers} from 'redux';
import React from 'react';
import {notification} from 'antd';
import {formatDate,getBeforeDate,getCurrentDate} from '../../../help/dateUtils';

const RECEIVE_GUARDIAN_WITH_RANGE = 'RECEIVE_GUARDIAN_WITH_RANGE';
const RECEIVE_GUARDIAN_ALL = 'RECEIVE_GUARDIAN_ALL';
const GUARDIAN_INSERT = 'GUARDIAN_INSERT';
const GUARDIAN_BATCH_INSERT = 'GUARDIAN_BATCH_INSERT';

const RECEIVE_PRESSURE_WITH_RANGE = 'RECEIVE_PRESSURE_WITH_RANGE';
const RECEIVE_PRESSURE_ALL = 'RECEIVE_PRESSURE_ALL';
const PRESSURE_INSERT = 'PRESSURE_INSERT';
const PRESSURE_BATCH_INSERT = 'PRESSURE_BATCH_INSERT';

const RECEIVE_PUMP_SPEED_WITH_RANGE = 'RECEIVE_PUMP_SPEED_WITH_RANGE';
const RECEIVE_PUMP_SPEED_ALL = 'RECEIVE_PUMP_SPEED_ALL';
const PUMP_SPEED_INSERT = 'PUMP_SPEED_INSERT';
const PUMP_SPEED_BATCH_INSERT = 'PUMP_SPEED_BATCH_INSERT';

const CHANGE_LAST_TIME = 'CHANGE_LAST_TIME';

const MERGE_AXIS_DATA = 'MERGE_AXIS_DATA';
const MERGE_GUARDIAN_DATA = 'MERGE_GUARDIAN_DATA';
const MERGE_PRESSURE_DATA = 'MERGE_PRESSURE_DATA';
const MERGE_PUMP_SPEED_DATA = 'MERGE_PUMP_SPEED_DATA';
const CLEAR_PUMP_SPEED_DATA = 'CLEAR_PUMP_SPEED_DATA';
const dispLength = 60;

/*
 const chartDataDefault= function() {
 var i;
 var j;
 var result=[];
 for (i = 0; i <= 6000; i++) {
 for (j = 0; j <= 25; j++){
 result[i].data[j] = 300*Math.random();
 }
 result[i].name = 'test';
 result[i].key = i;
 result[i].type = 'line';
 }
 return result;
 };*/
//action
export const receiveGuardianWithRange = (guardian) => ({
  type: RECEIVE_GUARDIAN_WITH_RANGE,
  guardian: guardian,
});
export const receiveGuardianAll = (guardian) => ({
  type: RECEIVE_GUARDIAN_ALL,
  guardian: guardian,
});
export const guardianInsert = (guardian) => ({
  type: GUARDIAN_INSERT,
  guardian: guardian,
});
export const guardianBatchInsert = (guardian) => ({
  type: GUARDIAN_BATCH_INSERT,
  guardian: guardian,
});

export const receivePressureWithRange = (pressure) => ({
  type: RECEIVE_PRESSURE_WITH_RANGE,
  pressure: pressure,
});
export const receivePressureAll = (pressure) => ({
  type: RECEIVE_PRESSURE_ALL,
  pressure: pressure,
});
export const pressureInsert = (pressure) => ({
  type: PRESSURE_INSERT,
  pressure: pressure,
});
export const pressureBatchInsert = (pressure) => ({
  type: PRESSURE_BATCH_INSERT,
  pressure: pressure,
});

export const receivePumpSpeedWithRange = (pumpSpeed) => ({
  type: RECEIVE_PUMP_SPEED_WITH_RANGE,
  pumpSpeed: pumpSpeed,
});
export const receivePumpSpeedAll = (pumpSpeed) => ({
  type: RECEIVE_PUMP_SPEED_ALL,
  pumpSpeed: pumpSpeed,
});
export const pumpSpeedInsert = (pumpSpeed) => ({
  type: PUMP_SPEED_INSERT,
  pumpSpeed: pumpSpeed,
});
export const pumpSpeedBatchInsert = (pumpSpeed) => ({
  type: PUMP_SPEED_BATCH_INSERT,
  pumpSpeed: pumpSpeed,
});

export const changeLastTime = (lastTime) => ({
  type: CHANGE_LAST_TIME,
  lastTime: lastTime,
});

export const mergeAxisData = (axisData) => ({
  type: MERGE_AXIS_DATA,
  axisData: axisData,
});
export const mergeGuardianData = (guardianData) => ({
  type: MERGE_GUARDIAN_DATA,
  guardianData: guardianData,
});
export const mergePressureData = (pressureData) => ({
  type:MERGE_PRESSURE_DATA,
  pressureData: pressureData
});
export const mergePumpSpeedData = (pumpSpeedData) => ({
  type:MERGE_PUMP_SPEED_DATA,
  pumpSpeedData: pumpSpeedData,//chartDataGenerate(former, pumpSpeed , dispLength))
});
export const clearPumpSpeedData = () => ({
  type:CLEAR_PUMP_SPEED_DATA,
  pumpSpeedData: {},//chartDataGenerate(former, pumpSpeed , dispLength))
});


//function
export const receiveGuardianWithRangeFunction =(surgeryNo,timeRange)=> {
  var param={

  };
  var timeTemp = getCurrentDate();
  const url = ('/guardian/get/'+surgeryNo+'/'+timeRange);
  return {
    promise: post(url, param),
    onSuccess: (guardian, dispatch) => {
      if (guardian.length>0) {
        dispatch(receiveGuardianWithRange(guardian));
        dispatch(mergeGuardianData(guardian));
      }
        changeLastTime(timeTemp);
    }
  }
};
export const receiveGuardianAllFunction =(param,surgeryNo)=> {
  const copy = _.clone(param);
  const url = ('/guardian/get/'+surgeryNo);
  return {
    promise: post(url, copy),
    onSuccess: (guardian, dispatch) => {
      if (guardian.length>0) {
        dispatch(receiveGuardianAll(guardian));
        dispatch(mergeGuardianData(guardian));
      }
      changeLastTime(getCurrentDate());
    }
  }
};

export const receivePressureWithRangeFunction =(param,surgeryNo,timeRange)=> {
  const copy = _.clone(param);
  const url = ('/pressure/get/'+surgeryNo+'/'+timeRange);
  return {
    promise: post(url, copy),
    onSuccess: (pressure, dispatch) => {
      if (pressure.length>0) {
        dispatch(receivePressureWithRange(pressure));
        dispatch(mergePressureData(pressure));
      }
      changeLastTime(getCurrentDate());

    }
  }
};
export const receivePressureAllFunction =(param,surgeryNo)=> {
  const copy = _.clone(param);
  const url = ('/pressure/get/'+surgeryNo);
  return {
    promise: post(url, copy),
    onSuccess: (pressure, dispatch) => {
      if (pressure.length>0) {
        dispatch(receivePressureAll(pressure));
        dispatch(mergePressureData(pressure));
      }
      changeLastTime(getCurrentDate());
    },
  }
};

export const receivePumpSpeedWithRangeFunction =(param,surgeryNo,timeRange)=> {
  const copy = _.clone(param);
  const url = ('/pumpSpeed/get/'+surgeryNo+'/'+timeRange);
  return {
    promise: post(url, copy),
    onSuccess: (pumpSpeed, dispatch) => {
      if (pumpSpeed.length>0) {
        dispatch(receivePumpSpeedWithRange(pumpSpeed));
        dispatch(mergePumpSpeedData(pumpSpeed));
      }
        changeLastTime(getCurrentDate());
    }
  }
};
export const receivePumpSpeedAllFunction =(param,surgeryNo)=> {
  const copy = _.clone(param);
  const url = ('/pumpSpeed/get/'+surgeryNo);
  return {
    promise: post(url, copy),
    onSuccess: (pumpSpeed, dispatch) => {
      if(pumpSpeed != undefined) {
        if (pumpSpeed.length > 0) {
          dispatch(receivePumpSpeedAll(pumpSpeed));
          dispatch(mergePumpSpeedData(pumpSpeed));
        }
        changeLastTime(getCurrentDate());
      }
    }
  }
};

export function chartDataGenerate(former, latter , lengthOfArray=0){
  var result = former;
  for (var obj in latter){
    if (result[obj] != undefined) {
      result[obj] = result[obj].concat(latter[obj]);
      if (lengthOfArray != 0) {
        for (; result[obj].length > lengthOfArray;) {
          result[obj].shift();
        }
      } else {
        if (obj.toString()=='warmer'){
          for (; result[obj].length > 60;) {
            result[obj].shift();
          }
        } else if (obj.charAt(obj.length - 1) != 'T'){
          for (; result[obj].length > 1;) {
            result[obj].shift();
          }
        }
      }
    } else {
      result[obj] = latter[obj];
      if (lengthOfArray != 0) {
        for (; result[obj].length > lengthOfArray;) {
          result[obj].shift();
        }
      }
    }
  }
  return result;
}

//reducer
function guardian(state= {
  guardian: []
}, action) {
  switch (action.type){
    case RECEIVE_GUARDIAN_WITH_RANGE: {
      return Object.assign({},state,{guardian:action.guardian});
    }
    case RECEIVE_GUARDIAN_ALL: {
      return Object.assign({},state,{guardian:action.guardian});
    }
    case GUARDIAN_INSERT: {
      return Object.assign({},state,{guardian:action.guardian});
    }
    case GUARDIAN_BATCH_INSERT: {
      return Object.assign({},state,{guardian:action.guardian});
    }
    default:{
      return state;
    }
  }
}
function pressure(state= {
  pressure: []
}, action) {
  switch (action.type){
    case RECEIVE_PRESSURE_WITH_RANGE: {
      return Object.assign({},state,{pressure:action.pressure});
    }
    case RECEIVE_PRESSURE_ALL: {
      return Object.assign({},state,{pressure:action.pressure});
    }
    case PRESSURE_INSERT: {
      return Object.assign({},state,{pressure:action.pressure});
    }
    case PRESSURE_BATCH_INSERT: {
      return Object.assign({},state,{pressure:action.pressure});
    }
    default:{
      return state;
    }
  }
}
function pumpSpeed(state= {
  pumpSpeed: []
}, action) {
  switch (action.type){
    case RECEIVE_PUMP_SPEED_WITH_RANGE: {
      return Object.assign({},state,{pumpSpeed:action.pumpSpeed});
    }
    case RECEIVE_PUMP_SPEED_ALL: {
      return Object.assign({},state,{pumpSpeed:action.pumpSpeed});
    }
    case PUMP_SPEED_INSERT: {
      return Object.assign({},state,{pumpSpeed:action.pumpSpeed});
    }
    case PUMP_SPEED_BATCH_INSERT: {
      return Object.assign({},state,{pumpSpeed:action.pumpSpeed});
    }
    default:{
      return state;
    }
  }
}
function lastTime(state= {
  lastTime: '',
}, action) {
  switch (action.type){
    case CHANGE_LAST_TIME: {
      return Object.assign({},state,{lastTime:action.lastTime});
    }
    default:{
      return state;
    }
  }
}
function chartDataLocal(state={
  guardianData: {},
  pressureData: {},
  pumpSpeedData: {},
},action){
  switch (action.type){
    case MERGE_AXIS_DATA: {
      return Object.assign({},state,{axisData:action.axisData});
    }
    case MERGE_GUARDIAN_DATA:{
      return Object.assign({},state,{guardianData:chartDataGenerate(state.guardianData, action.guardianData, dispLength)});
    }
    case MERGE_PRESSURE_DATA:{
      return Object.assign({},state,{pressureData:chartDataGenerate(state.pressureData, action.pressureData, dispLength)});
    }
    case MERGE_PUMP_SPEED_DATA:{
      return Object.assign({},state,{pumpSpeedData:chartDataGenerate(state.pumpSpeedData, action.pumpSpeedData, 0) });//chartDataGenerate(state.pumpSpeedData, action.pumpSpeedData, dispLength))
    }
    case CLEAR_PUMP_SPEED_DATA:{
      return Object.assign({},state,{pumpSpeedData: {} });
    }
    default: return state
  }
}

export default combineReducers({
  guardian, pressure, pumpSpeed, lastTime, chartDataLocal
})


//tools

