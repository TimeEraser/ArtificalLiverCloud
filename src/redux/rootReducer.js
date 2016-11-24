import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import setting from './modules/delete/setting';
import layout from './modules/delete/layout';
import authority from './modules/delete/authority';
import configCenter from './modules/configCenter';
import monitor from './modules/delete/monitor';
import syntax from './modules/delete/syntax';
import alarmCenter from './modules/alarm/alarmCenter';
import chartData from './modules/chart/chartData';
import SurgeryData from './modules/surgery/SurgeryData';

export default combineReducers({
  authority,
  setting,
  alarmCenter,
  chartData,
  SurgeryData,
  configCenter,
  layout,
  monitor,
  syntax,
  router,
});

