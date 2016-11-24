import _ from 'lodash';
import {get, post} from 'help/fetchHelp';
const URL_DIRECTORY = '/config/limit';
const RECEIVE_UNITS = 'RECEIVE_UNITS';
const UPDATE_UNITE = 'RECEIVE_UNITS';
const CHANGE_MODE = 'CHANGE_MODE';

export default function reducer(state = {
  appName: '',
  configUnits: [],
  contentVisible: false
}, action = {}) {
  switch (action.type) {
    case RECEIVE_UNITS:
      var newConfigUnits = action.configUnits.sort((a, b) => {return a.index > b.index;});
      return Object.assign({}, state, {
        appName: action.appName,
        configUnits: newConfigUnits,
        contentVisible: action.contentVisible
      });
    case UPDATE_UNITE:
      return Object.assign({}, state, {
        appName: action.appName,
        configUnits: action.configUnits,
        contentVisible: action.contentVisible
      });
    case CHANGE_MODE:
      var keyName = action.keyName;
      var newConfigMode = action.configMode;
      var configUnits = [];
      _.map(state.configUnits, unit => {
        if (unit.keyName === keyName) {
          var modes = [];
          _.map(unit.current, mode => {
            if (mode.modeName === newConfigMode.modeName) {
              modes.push(newConfigMode);
            } else {
              modes.push(mode);
            }
          });
          var newConfigUnit = Object.assign({}, unit, {
            current: modes
          });
          configUnits.push(newConfigUnit);
        } else {
          configUnits.push(unit);
        }
      });
      return Object.assign({}, state, {
        configUnits: configUnits
      });
    default:
      return state;
  }
}

const changeMode = (keyName, configMode) => ({
  type: CHANGE_MODE,
  configMode: configMode,
  keyName: keyName
});

const receiveUnits = (appName, configUnits) => ({
  type: RECEIVE_UNITS,
  appName: appName,
  configUnits: configUnits,
  contentVisible: true
});

const updateUnits = (appName, configUnits) => ({
  type: UPDATE_UNITE,
  appName: appName,
  configUnits: configUnits,
  contentVisible: true
});

export const saveConfigList = (appName, configUnits) => ({
  promise: post(`${URL_DIRECTORY}/saveLimitConfig`, {content: JSON.stringify(configUnits), appName: appName}, false),
  onSuccess: (data, dispatch)=> {
    dispatch(updateUnits(appName, configUnits));
  },
  alert: '保存成功'
});

export const getConfigList = (appName) => ({
  promise: get(`${URL_DIRECTORY}/getLimitConfig`, {appName: appName}),
  onSuccess: (data, dispatch)=> {
    dispatch(receiveUnits(appName, data));
  }
});

export const changeConfigMode = (keyName, configMode) => {
  return changeMode(keyName, configMode);
};

export const changeAppName = (appName) => {
  return getConfigList(appName);
};
