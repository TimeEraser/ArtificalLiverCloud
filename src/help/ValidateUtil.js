const getValidate = (status, help)=> {
  return {validateStatus: status, help: help};
};
const getCallback = (result, key, rule)=> (msg) => {
  result[key] = _.isError(msg) ? getValidate('error', rule.message) :
    (msg && _.isString(msg)) ? getValidate('error', msg) : getValidate('success', '');
};
/**
 * 校验主函数
 * @param data 需要校验的数据
 * @param rules 校验规则
 * @returns {*|OrderedMap|Object}
 */
export function validate(data, rules) {
  const result = {};
  _.forEach(rules, (rule, key)=> {
    const value = data[key];
    if (rule.require) {
      const finalValue = _.isString(rule.path) ? _.get(value, rule.path) : value;
      result[key] = finalValue ? getValidate('success', '') : getValidate('error', rule.message);
    } else if (rule.validator && _.isFunction(rule.validator)) {
      const callback = getCallback(result, key, rule);
      rule.validator(rule, value, callback);
    }
  });
  return _.merge({}, this.state, {validate: result});
}

export function initValidate(props) {
  const result = {};
  _.forEach(props, v=> {
    result[v] = {validateStatus: '', help: ''};
  });
  return result;
}

export function checkResult(result) {
  return _.some(result.validate, (v)=> {
    return v.validateStatus === 'error';
  });
}
