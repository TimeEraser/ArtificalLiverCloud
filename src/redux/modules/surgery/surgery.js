import {get, post} from '../../../help/fetchHelp';
import _ from 'lodash';
import {combineReducers} from 'redux';
import {updateObjToArr} from '../../utils/dataUtil';
import React from 'react';
import {notification} from 'antd';
import {formatDate,getCurrentDate,getBeforeDate} from '../../../help/dateUtils';

const RECEIVE_SURGERIES = 'RECEIVE_SURGERIES';
const CHANGE_SURGERIES_TIME_RANGE = 'CHANGE_SURGERIES_TIME_RANGE';
const CHANGE_SURGERIES_LIMIT= 'CHANGE_SURGERIES_LIMIT';
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
export const changeSurgeriesTimeRange = (timeRange) => ({
  type: CHANGE_SURGERIES_TIME_RANGE,
  timeRange: timeRange
});
//function part
export const getSurgeries = (param)=> {
  const copy = _.clone(param);
  const url = (`/surgery/receive`);
  return {
    promise: post(url, copy),
    onSuccess: (result, dispatch)=> {
      if (result.success==true) {
        var surgeries = result.data;
        _.forEach(surgeries, (obj)=> {
          transformSurgeries(surgeries);
        });
        dispatch(receiveSurgeries(surgeries));
      } else {
        openNotificationWithIcon("failure",'系统异常','获取手术列表失败')
      }
    }
  };
};

//data part
function surgery(state = {
  surgeries: [],
  timeRange:getCurrentDate()+'~'+getBeforeDate(30)
}, action) {
  switch (action.type) {
    case RECEIVE_SURGERIES:
      return Object.assign({}, state, {surgeries: action.surgeries});
    case CHANGE_SURGERIES_TIME_RANGE:
      return Object.assign({}, state, {timeRange: action.timeRange});
    default:
      return state;
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
  surgery
});
