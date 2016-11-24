import _ from 'lodash';
import {get, post} from 'help/fetchHelp';
export const SHOW_MASK = 'SHOW_MASK';
export const CHANGE_SUBMENU = 'CHANGE_SUBMENU';
export const CHANGE_MENUITEM = 'CHANGE_MENUITEM';
const INSERT_USERCONF = 'INSERT_USERCONF';
const READ_USERCONF = 'READ_USERCONF';
export function showMask(mask) {
  return {
    type: SHOW_MASK,
    mask: mask
  };
}

export function changeSubMenu(content) {
  return {
    type: CHANGE_SUBMENU,
    content: content
  };
}

export function changeMenuItem(content) {
  return {
    type: CHANGE_MENUITEM,
    content: content
  };
}

export default function reducer(
  state = {
  mask: false,
  subMenu: '概要信息',
  menuItem: 'home'
}, action = {}) {
  switch (action.type) {
    case SHOW_MASK:
      return Object.assign({}, state, {mask: action.mask});
    case CHANGE_SUBMENU:
      return Object.assign({}, state, {subMenu: action.content});
    case CHANGE_MENUITEM:
      return Object.assign({}, state, {menuItem: action.content});
    default:
      return state;
  }
}

export const insertUserConf = (type, conf)=> {
  _.unset(conf, 'id');
  _.unset(conf, 'key');
  return {
    promise: post(`/userConf/insert`, {kv: JSON.stringify(conf), type: type}, true),
    type: INSERT_USERCONF,
    confirm: {title: '确定要保存吗?'},
    alert: '保存成功(5秒后关闭)'
  };
};

export const readUserConf = (type, receiveFunc)=>({
  promise: get(`/userConf/read`, {type: type}),
  type: READ_USERCONF,
  onSuccess: (conf, dispatch)=> {
    _.unset(conf, 'id');
    _.unset(conf, 'key');
    dispatch(receiveFunc(conf));
  }
});
