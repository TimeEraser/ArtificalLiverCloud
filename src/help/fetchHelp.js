import {CONSOLE_HOST as domain} from './constants';
import {REDIRECT_HOST as login} from './constants';
import {notification} from 'antd';
export function formatQuery(param) {
  var result = '';
  var flag = false;
  _.forEach(param, (value, key) => {
    result += flag ? '&' : '';
    result += key + '=' + value;
    flag = true;
  });
  return result;
}

export function get(url, param) {
  const query = param ? ('?' + formatQuery(param)) : '';
  return ()=>fetch(`${domain}${url}${query}`, {credentials: 'include',mode:'cors'})
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        return result.data;
      } else if ((result.code === '302')){
        window.location.href = result.data.redirect+'?redirect='+login;
      } else if ((result.status) && (result.status.code === 4005)){
        throw new Error(result.status.msg);
      }
      const args = {
        message: "请求失败",
        description: result.message,
        duration: 2,
      };
      notification.error(args);
    });
}

export function post(url, param, isJson) {
  const request = {
    method: 'POST',
    dataType: 'json',
    credentials: 'include'
  };
  request.headers = !!isJson ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  request.body = !!isJson ? JSON.stringify(param) : formatQuery(param);

  return ()=>fetch(`${domain}${url}`, request).then(response => response.json())
    .then(result => {
      if (result.success) {
        return result.data;
      } else if ((result.code === '302')){
        window.location.href = result.data.redirect+'?redirect='+login;
      } else if ((result.status) && (result.status.code === 4005)){
        throw new Error(result.status.msg);
      }
      const args = {
        message: "请求失败",
        description: result.message,
        duration: 2,
      };
      notification.error(args);
    });
}
