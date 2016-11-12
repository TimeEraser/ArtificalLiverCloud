import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import setting from './modules/delete/setting';
import layout from './modules/delete/layout';
import authority from './modules/delete/authority';
import configCenter from './modules/configCenter';
import jobCenter from './modules/jobCenter/jobCenter';
import jobDetail from './modules/jobCenter/jobDetail';
import monitor from './modules/delete/monitor';
import syntax from './modules/delete/syntax';
import userInfo from './modules/userInfo';
import SurgeryData from './modules/surgery/SurgeryData';
export default combineReducers({
  authority,
  setting,
  configCenter,
  jobCenter,
  jobDetail,
  SurgeryData,
  layout,
  monitor,
  syntax,
  router,
  userInfo
});

