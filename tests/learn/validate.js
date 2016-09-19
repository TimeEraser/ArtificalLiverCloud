import _ from '../../node_modules/lodash';
import {validate, initValidate} from '../../src/help/validateUtil';
const rules = {
  key: {require: true, message: '请输入key'},
  value: {require: true, message: '请输入value'},
  desc: {require: false, message: '请输入desc'},
  msg: {
    validator: (rule, value, callback)=> {
      callback('msgmsg');
    }, message: '最小为5'
  },
  error: {
    validator: (rule, value, callback)=> {
      callback(new Error());
    }, message: 'errorerror'
  },
  length: {
    validator: (rule, value, callback)=> {
      if (value || value.length < 5) {
        callback(new Error());
      }
    }, message: '最小长度为5'
  }
};


class Test {
  constructor() {
    this.state = {
      visible: false,
      setting: {key: 'kk', value: 'vv', length: 'xxx'},
      validate: initValidate(['key', 'value', 'desc'])
    };
  }

  vali() {
    return validate.call(this, this.state.setting, rules);
  }
}
const test = new Test();
console.log(test.vali());


