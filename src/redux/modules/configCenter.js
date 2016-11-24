import {get, post} from '../../help/fetchHelp';
import _ from 'lodash';
import {combineReducers} from 'redux';
import {receiveObjToArr} from '../utils/dataUtil';
const RECEIVE_CLUSTERS = 'RECEIVE_CLUSTERS';
const CHANGE_VISIBLE = 'CHANGE_APP_VISIBLE';
const CHANGE_VALUE = 'CHANGE_CLUSTER_VALUE';
const DELETE_CLUSTER = 'DELETE_CLUSTER';
const CHANGE_MODAL = 'CHANGE_MODAL';
const RECEIVE_CLUSTER = 'RECEIVE_CLUSTER';
const CHANGE_READONLY = 'CHANGE_READONLY';

function table(state = {
  clusters: [],
  isAdmin: false
}, action) {
  switch (action.type) {
    case RECEIVE_CLUSTERS:
      return Object.assign({}, state, {clusters: action.clusters});
    case RECEIVE_CLUSTER:
      return Object.assign({}, state, receiveObjToArr(state.clusters, transformObj(action.cluster), 'clusterName', 'clusters'));
    case DELETE_CLUSTER:
      return Object.assign({}, state, {
        clusters: _.filter(state.clusters, (app)=> {
          return app.clusterName !== action.clusterName;
        })
      });
    default:
      return state;
  }
}

export const transformObj = (obj)=> {
  _.merge(obj, {
    key: obj.clusterName
  });
  return obj;
};

function modal(state = {
  visible: false,
  readOnly: false,
  modal: {}
}, action) {
  switch (action.type) {
    case CHANGE_VISIBLE:
      return Object.assign({}, state, {visible: action.visible});
    case CHANGE_READONLY:
      return Object.assign({}, state, {readOnly: action.readOnly});
    case CHANGE_VALUE :
      return Object.assign({}, state, {modal: _.merge({}, state.modal, _.set({}, action.path, action.value))});
    case CHANGE_MODAL:
      return Object.assign({}, state, {modal: action.app});
    default:
      return state;
  }
}

export const changeVisible = (visible) => ({
  type: CHANGE_VISIBLE,
  visible: visible
});

export const changeReadOnly = (readOnly)=>({
  type: CHANGE_READONLY,
  readOnly: readOnly
});

export const changeModal = (app) => ({
  type: CHANGE_MODAL,
  app: app
});

export const changeValue = (path, value) => ({
  type: CHANGE_VALUE,
  path: path,
  value: value
});

const receiveCluster = (cluster) => ({
  type: RECEIVE_CLUSTER,
  cluster: cluster
});

export const insertOrUpdate = (param, event)=> {
  const copy = _.clone(param);
  const url = (event === 'update' ? '/cluster/update' : '/cluster/insert');
  return {
    promise: post(url, copy),
    onSuccess: (app, dispatch)=> {
      dispatch(receiveCluster(app));
    }
  };
};


const receiveClusters = (clusters) => ({
  type: RECEIVE_CLUSTERS,
  clusters: clusters
});

export const deleteCluster = (clusterName)=>( {
  promise: post('/cluster/delete', {clusterName: clusterName}),
  type: DELETE_CLUSTER,
  clusterName: clusterName,
  confirm: {title: '确定要删除吗?'}
});

export const getClusters = () => ({
  promise: get('/cluster/findAll'),
  onSuccess: (clusters, dispatch) => {
    dispatch(receiveClusters(clusters));
  }
});

export default combineReducers({
  table, modal
});

