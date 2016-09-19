import _ from 'lodash';
import {formatDate} from '../../help/dateUtils';


export const transformObj = (obj)=> {
  _.merge(obj, {
    key: obj.id,
    created: formatDate(obj.created),
    updated: formatDate(obj.updated)
  });
  return obj;
};

export const receiveObjToArr = (arr, obj, path, resultPath)=> {
  let flag;
  const result = {};
  const resultArr = _.map(arr, (o)=> {
    if (_.get(o, path) === _.get(obj, path)) {
      flag = true;
      return obj;
    }
    return o;
  });
  !flag && resultArr.unshift(obj);
  _.set(result, resultPath, resultArr);
  return result;
};

export const updateObjToArr = (arr, obj, path, resultPath)=> {
  const result = {};
  const resultArr = _.map(arr, (o)=> {
    if (_.get(o, path) === _.get(obj, path)) {
      return _.merge(o, obj);
    }
    return o;
  });
  _.set(result, resultPath, resultArr);
  return result;
};
