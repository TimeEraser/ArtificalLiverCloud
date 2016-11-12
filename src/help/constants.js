const pre = 'http://';
const suf = 'localhost:8080';
//const suf = 'access.vacuum.mogujie.org:8080';
//线上,线下,预发分别跳转至对应的首页。

export const REDIRECT_HOST = 'http://localhost:3000'
// export const REDIRECT_HOST = 'http://dev.vacuum.meili-inc.com'
export const CONSOLE_HOST =`${pre}${suf}`;
// export const CONSOLE_HOST = __PROD__ ? `${pre}.${suf}` :__DEV__?
//   `${pre}dev.${suf}` : __TCPROD__ ? `${pre}pre.${suf}` : `${pre}.${suf}:8080`;
