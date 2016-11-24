import {get, post} from '../../../help/fetchHelp';
import _ from 'lodash';
import {combineReducers} from 'redux';
import React from 'react';
import {Modal} from 'antd';
import {notification} from 'antd';
import {getCurrentDate,getBeforeDate} from '../../../help/dateUtils';

const RECEIVE_SURGERIES = 'RECEIVE_SURGERIES';
const RECEIVE_PERSONS_PATIENTS = 'RECEIVE_PERSONS_PATIENTS';
const RECEIVE_PERSONS_DOCTORS = 'RECEIVE_PERSONS_DOCTORS';
const CHANGE_CONDITIONS_PATIENT = 'CHANGE_CONDITIONS_PATIENT';
const CHANGE_CONDITIONS_DOCTOR = 'CHANGE_CONDITIONS_DOCTOR';
const CHANGE_CONDITIONS_TIME_RANGE = 'CHANGE_CONDITIONS_TIME_RANGE';
const RECEIVE_CURRENT_SURGERY = 'RECEIVE_CURRENT_SURGERY';
const ASSIGN_CURRENT_SURGERY = 'ASSIGN_CURRENT_SURGERY';
const UPLOAD_SURGERY_INFO = 'UPLOAD_SURGERY_INFO';

function transformSurgeries(obj) {
  _.merge(obj, {
    key: obj.id
  });
}
//action part
const receiveSurgeries= (surgeries) =>({
  type: RECEIVE_SURGERIES,
  surgeries:surgeries,
});
const receivePersonsPatients= (patients) =>({
  type: RECEIVE_PERSONS_PATIENTS,
  patients:patients,
});
const receivePersonsDoctors= (doctors) =>({
  type: RECEIVE_PERSONS_DOCTORS,
  doctors:doctors,
});
export const changeConditionsTimeRange = (timeRange) => ({
  type: CHANGE_CONDITIONS_TIME_RANGE,
  timeRange: timeRange
});
export const changeConditionsDoctor = (doctor) => ({
  type: CHANGE_CONDITIONS_DOCTOR,
  doctor: doctor
});
export const changeConditionsPatient = (patient) => ({
  type: CHANGE_CONDITIONS_PATIENT,
  patient: patient
});
export const receiveCurrentSurgery = (surgery) => ({
  type:RECEIVE_CURRENT_SURGERY,
  surgery: surgery,
});

const uploadSugeryInfo= (surgeries) =>({
  type: UPLOAD_SURGERY_INFO,
  surgeries:surgeries,
});

//function part
export const getCurrentSurgery = (param)=> {
  const copy = _.clone(param);
  var surgeryNo = copy.surgeryNo;
  const url = (`/surgery/get/`+surgeryNo)
  return {
    promise: post(url, copy),
    onSuccess: (surgery, dispatch)=> {
      dispatch(receiveCurrentSurgery(surgery));
    },
    onFailure:()=> {
      openNotificationWithIcon("failure",'系统异常','获取手术失败')
    }
  };
}
export const getSurgeries = (param)=> {
  const copy = _.clone(param);
  const url = (`/surgery/search`);
  return {
    promise: post(url, copy),
    onSuccess: (surgeries, dispatch)=> {
      _.forEach(surgeries, (obj)=> {
        transformSurgeries(surgeries);
      });
      openNotificationWithIcon("success",'查询手术成功','');
      dispatch(receiveSurgeries(surgeries));
    },
    onFailure:()=> {
      openNotificationWithIcon("failure",'系统异常','获取手术列表失败')
    }
  };
};
export const getPersons = (param)=> {
  const copy = _.clone(param);
  const url = (`/surgery/persons`);
  return {
    promise: post(url, copy),
    onSuccess: (result, dispatch)=> {
      var doctors = result.doctors;
      var patients= result.patients;
      dispatch(receivePersonsDoctors(doctors));
      dispatch(receivePersonsPatients(patients));
    }
  };
};

export const updateSurgeries = (param)=> {
  const copy = _.clone(param);
  const url = (`/updateSurgery`);
  return {
    promise: post(url, copy),
    onSuccess: (surgeries, dispatch)=> {
      _.forEach(surgeries, (obj)=> {
        transformSurgeries(surgeries);
      });
      openNotificationWithIcon("success",'查询手术成功','');
      dispatch(receiveSurgeries(surgeries));
    },
  };
};

//data part
function surgery(state = {
  surgeries: [],
}, action) {
  switch (action.type) {
    case RECEIVE_SURGERIES:
      return Object.assign({}, state, {surgeries: action.surgeries});
    default:
      return state;
  }
}

function conditions(state = {
  patient:'',
  doctor:'',
  timeRange:getBeforeDate(30)+'~'+getCurrentDate(),
}, action) {
  switch (action.type) {
    case CHANGE_CONDITIONS_TIME_RANGE:
      return Object.assign({}, state, {timeRange: action.timeRange});
    case CHANGE_CONDITIONS_PATIENT:
      return Object.assign({}, state, {patient: action.patient});
    case CHANGE_CONDITIONS_DOCTOR:
      return Object.assign({}, state, {doctor: action.doctor});
    default:
      return state;
  }
}
function persons(state = {
  patients:[],
  doctors:[],
}, action) {
  switch (action.type) {
    case RECEIVE_PERSONS_PATIENTS:
      return Object.assign({}, state, {patients: action.patients});
    case RECEIVE_PERSONS_DOCTORS:
      return Object.assign({}, state, {doctors: action.doctors});
    default:
      return state;
  }
}
function currentSurgery(state={
  surgery:{},
},action){
  switch (action.type){
    case RECEIVE_CURRENT_SURGERY: {
      return Object.assign({}, state, {surgery: action.surgery})
    }
    default: return state;
  }
}

//assistant part
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

export default combineReducers({
  surgery,conditions,persons,currentSurgery
});
