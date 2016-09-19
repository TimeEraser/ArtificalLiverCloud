
/**
 * Created by lybuestc on 16/8/1.
 */
import {get} from '../../help/fetchHelp';
const RECEIVE_USERINFO = 'RECEIVE_USERINFO';
/**
 * 用户名,角色,权限等.
 */
export default function reducer(state = {
  displayName: 'unknown',
  role: 'unknown',
  version: 'unknown'
}, action = {}) {
  switch (action.type) {
    case RECEIVE_USERINFO:
      return action.userInfo;
    default:
      return state;
  }
}

const receiveUserInfo = (userInfo) => ({
  userInfo: userInfo,
  type: RECEIVE_USERINFO
});

export const getUserInfo = () => ({
  promise: get(`/authority/userInfo`),
  onSuccess: (userInfo, dispatch) => {
    dispatch(receiveUserInfo(userInfo));
  }
});

