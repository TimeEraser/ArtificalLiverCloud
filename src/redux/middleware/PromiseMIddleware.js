import {showMask} from '../modules/delete/layout';
import {Modal} from 'antd';
import message from '../../help/raptorMessage';
import _ from 'lodash';
export const promiseMiddleware = ({dispatch, getState}) =>(next)=>(action)=> {

  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  const {promise, onSuccess, type, confirm, alert, mask, ...rest} = action;
  const callback = ()=> {

    if (!promise) {
      return next(action);
    }
    mask && dispatch(showMask(true));

    promise().then((data)=> {
      alert || _.isString(data) && message.success(alert ? alert : data);
      typeof onSuccess !== 'undefined' ? onSuccess(data, dispatch, getState) : next({type: type, ...rest});
      dispatch(showMask(false));
    }, (err)=> {
      message.error(err.message, 5);
      dispatch(showMask(false));
    });
  };
  typeof confirm !== 'undefined' ?
    Modal.confirm({
      title: confirm.title,
      onOk() {
        callback();
      }
    }) : callback();
};
