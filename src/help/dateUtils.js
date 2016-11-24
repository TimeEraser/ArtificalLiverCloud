import dateFormat from 'dateformat';
export function formatDate(time) {
  return dateFormat(time, 'yyyy-mm-dd HH:MM:ss');//类库的mm和MM是反的..
}
export function getCurrentDate() {
  var k=1;
  return formatDate(Date.now());
}
export function getBeforeDate(beforeDay) {
  return formatDate(Date.now()-beforeDay*86400*1000);
}
