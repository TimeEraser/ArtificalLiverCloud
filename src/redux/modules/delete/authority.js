import _ from 'lodash';
import {get, post} from 'help/fetchHelp';
import {receiveObjToArr} from '../../utils/dataUtil';
const URL_DIRECTORY = '/authority';
const RECEIVE_AUTHORITIES = 'RECEIVE_AUTHORITIES';
const DELETE_AUTHORITY = 'DELETE_AUTHORITY';
const RECEIVE_AUTHORITY = 'RECEIVE_AUTHORITY';

function transformAuthority(obj) {
  _.merge(obj, {
    key: obj.username
  });
  return obj;
}
export default function reducer(state = {
  authorities: []
}, action = {}) {
  switch (action.type) {
    case RECEIVE_AUTHORITIES:
      return Object.assign({}, state, {
        authorities: action.authorities
      });
    case DELETE_AUTHORITY:
      return Object.assign({}, state, {
        authorities: _.filter(state.authorities, (authority)=> {
          return authority.username !== action.username;
        })
      });
    case RECEIVE_AUTHORITY:
      return receiveObjToArr(state.authorities, transformAuthority(action.authority), 'username', 'authorities');
    default:
      return state;
  }
}


const receiveAuthority = (authority)=> ({
  type: RECEIVE_AUTHORITY,
  authority: authority
});

export const insertAuthority = (authority) =>({
  promise: post(`${URL_DIRECTORY}/insert`, {
    username: authority.username,
    roleId: authority.role.id
  }),
  onSuccess: (data, dispatch)=> {
    dispatch(receiveAuthority(authority));
  }
});

export const deleteAuthority = (username)=>( {
  promise: post(`${URL_DIRECTORY}/delete`, {username: username}),
  type: DELETE_AUTHORITY,
  username: username,
  confirm: {title: '确定要删除吗?'}
});


const receiveAuthorities = (authorities) =>({
  type: RECEIVE_AUTHORITIES,
  authorities: authorities
});


export const getAuthorities = ()=> ({
  promise: get('/authority/findAll'),
  onSuccess: (authorities, dispatch)=> {
    _.forEach(authorities, authority=> {
      transformAuthority(authority);
    });
    dispatch(receiveAuthorities(authorities));
  }
});
