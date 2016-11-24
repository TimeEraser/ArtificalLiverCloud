import _ from 'lodash';
import {get, post} from 'help/fetchHelp';
import {receiveObjToArr, transformObj} from '../../utils/dataUtil';
const URL_DIRECTORY = '/setting';
const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';
const DELETE_SETTING = 'DELETE_SETTING';
const RECEIVE_SETTING = 'RECEIVE_SETTING';

export default function reducer(state = {
  settings: []
}, action = {}) {
  switch (action.type) {
    case RECEIVE_SETTINGS:
      return Object.assign({}, state, {
        settings: action.settings
      });
    case DELETE_SETTING:
      return Object.assign({}, state, {
        settings: _.filter(state.settings, (setting)=> {
          return setting.id !== action.id;
        })
      });
    case RECEIVE_SETTING:
      return receiveObjToArr(state.settings, transformObj(action.setting), 'id', 'settings');
    default:
      return state;
  }
}

const receiveSetting = (setting)=> ({
  type: RECEIVE_SETTING,
  setting: setting
});

export const insertSetting = (setting)=> ({
  promise: post(`${URL_DIRECTORY}/insert`, setting, true),
  onSuccess: (data, dispatch)=> {
    dispatch(receiveSetting(data));
  },
  alert: '添加成功'
});

export const deleteSetting = (id)=>({
  promise: post(`${URL_DIRECTORY}/delete`, {id: id}),
  type: DELETE_SETTING,
  id: id,
  confirm: {title: '确定要删除吗?'}
});


const receiveSettings = (settings)=>({
  type: RECEIVE_SETTINGS,
  settings: settings
});

export const getSettings = ()=>({
  promise: get(`${URL_DIRECTORY}/findAll`),
  onSuccess: (settings, dispatch)=> {
    settings.forEach(s=>transformObj(s));
    dispatch(receiveSettings(settings));
  }
});

