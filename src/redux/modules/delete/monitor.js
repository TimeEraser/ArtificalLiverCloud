import _ from 'lodash';
import {get, post} from 'help/fetchHelp';
const URL_DIRECTORY = '/config/monitor';
const RECEIVE_USERS = 'RECEIVE_USERS';
const UPDATE_USERS = 'UPDATE_USERS';

export default function reducer(state = {
  appName: '',
  userNames: [],
  contentVisible: false
}, action = {}) {
  switch (action.type) {
    case RECEIVE_USERS:
      const users = [];
      _.each(action.data.monitorUsers, (user) => {
        users.push(user.uname);
      });

      return Object.assign({}, state, {
        appName: action.appName,
        userNames: users,
        contentVisible: action.contentVisible
      });
    case UPDATE_USERS:
      return Object.assign({}, state, {
        appName: action.appName,
        userNames: action.userNames,
        contentVisible: action.contentVisible
      });
    default:
      return state;
  }
}

const receiveUsers = (appName, data) => ({
  type: RECEIVE_USERS,
  appName: appName,
  data: data,
  contentVisible: true
});


const updateUsers = (appName, users) => ({
  type: UPDATE_USERS,
  appName: appName,
  userNames: users,
  contentVisible: true
});

const saveUser = (appName, users) => ({
  promise: post(`${URL_DIRECTORY}/saveUserNames`, {userNames: users, appName: appName}, false),
  onSuccess: (data, dispatch)=> {
    dispatch(updateUsers(appName, users));
  }
});

export const addUser = (appName, users, user) => {
  users.push(user);
  return saveUser(appName, users);
};

export const deleteUser = (appName, users, user) => {
  return saveUser(appName,
    _.filter(users, (oldUser) => {
      return oldUser !== user;
    })
  );
};

export const getUsers = (appName) => ({
  promise: get(`${URL_DIRECTORY}/getUsers`, {appName: appName}),
  onSuccess: (data, dispatch)=> {
    dispatch(receiveUsers(appName, data));
  }
});

export const changeAppName = (appName) => {
  return getUsers(appName);
};
