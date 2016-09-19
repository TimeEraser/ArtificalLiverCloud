var _ = require('lodash');
const validate = {
  validate: {
    key: {status: 'error'},
    desc: {status: 'error'},
    value: {status: 'success'}
  }
};
//console.log(_.flatten(validate))
//const result2 = {validate: {key: {status: ''}, desc: {status: 'success'}}};


//function makeActionCreator(type, ...argNames) {
//  return function(...args) {
//    let action = { type }
//    argNames.forEach((arg, index) => {
//      action[argNames[index]] = args[index]
//    })
//    return action
//  }
//}
//const makeActionCreator = (type, ...argNames)=>(...args)=> {
//  const action = {type};
//  _.forEach(argNames, (name, index)=> {
//    action[argNames[index]] = args[index];
//  });
//  return action;
//}
//
//
//const ADD_TODO = 'ADD_TODO';
//console.log(makeActionCreator(ADD_TODO, 'result'));
//console.log(makeActionCreator(ADD_TODO, 'result')(result));
//

//const createReducer = (initialState, reducers)=>(state, action)=> {
//  const finalState = _.isUndefined(state) ? initialState : state;
//  const callback = reducers[action.type];//function检查
//  if (_.isUndefined(callback) || !_.isFunction(callback)) {
//    return finalState;
//  }
//  return callback(finalState, action);
//};
//
//const initialState = {a: 'a', inner: {b: 'b', c: 'c'}};
//const reducers = {
//  changeA: (state, action)=> {
//    return Object.assign({}, state, {a: action.payload});
//  },
//  changeB: (state, action)=> {
//    return Object.assign({}, state, {inner: {b: action.payload}});
//  }
//}
//
//console.log(createReducer(initialState, reducers)(initialState, {type: 'changeA', payload: 'a+'}));


//const re = {a: 'a', b: 'b', c: 'c'};

//console.log(_(re).map((v)=>v + '1').reverse().value())

//console.log(_(re).keys().splice(1).value())
//
//var users = [
//  {'user': 'barney', 'age': 36},
//  {'user': 'fred', 'age': 40},
//  {'user': 'pebbles', 'age': 1}
//];
//
//var youngest = _()
//  .chain()
// .tap((arr)=>arr.push({user: 'benchu', age: 0}))
//  .sortBy('age')
//  .map((o)=> {
//    return o.user + ' is ' + o.age;
//  })
//  .head();
//console.log(youngest.plant(users).value())


//function customizer(objValue, srcValue) {
//  if (_.isArray(objValue)) {
//    return objValue.concat(srcValue);
//  }
//}
//
//var object = {
//  'fruits': ['apple'],
//  'vegetables': ['beet']
//};
//
//var other = {
//  'vegetables': ['carrot'],
//  'fruits': ['banana']
//
//};
//
//console.log(_.mergeWith(object, other, customizer));

//var saves = ['profile', 'settings'];
//
//var done = _.after(saves.length, function() {
//  console.log('done saving!');
//});
//
//_.forEach(saves, function(type) {
//  console.log(type);
//  done();
//});


//var greet = function (a, b, c) {
//  return a + ' ' + b + ' ' + c + ' ' + this.user;
//};
//
//var object = {'user': 'fred'};
//
//var bound = _.bind(greet, object, 'hi');
//console.log(bound('!'));
//
//
//// Bound with placeholders.
//var bound = _.bind(greet, object, _, _, _, "!");
//console.log(bound('hi', 'gg', 'ff '));

//const xy = (x, y)=> {
//  return x * y;
//}
//
//
//var p = _.wrap(xy, function (func, x, y) {
//  return '<p>' + func(x, y) + '<p>';
//});
//
//console.log(p(10, 5));

//const arr = [1, 2, 3];
//console.log(arr.slice(0, 100))

//var str = 'xiuluo';
//console.log(str.indexOf('xiu'))
//
//const allUsers = ["xiuluo", "dabing", "xiaoxiao", "wenshu", "mangguo", "tieniu", "dugu", "huanmie", "beile", "zhiping", "ziyou", "tuzi", "qianxun", "baozi", "aya", "aimeng", "aliang", "mengde", "shifo", "shanshan", "qiaoba", "muming", "xiaokou", "fengxian", "xiaobao", "wuming", "zuoer", "zhuqi", "boshen", "liuding", "xiatian", "douzi", "linlang", "zhenghai", "chuanbei", "xiaoqiang", "shitou", "feimao", "taile", "maomi", "xiaobai", "ronger", "xiaoming", "zhizhi", "xuda", "yaoyao", "duowen", "songpo", "yibei", "zhoumo", "yilin", "shuya", "qingye", "beidou", "qimi", "xiaodao", "muxi", "haidou", "guanxi", "yihan", "taozi", "qianyu", "kankan", "wuji", "xigua", "baolu", "xiaoxin", "ziye", "dada", "hongzhang", "yingxun", "ximeng", "panda", "baoyu", "dounai", "yueming", "yuedan", "shinian", "suwu", "chiyou", "chencheng", "wufeng", "arun", "yinuo", "changqing", "xiaohai", "hunshou", "shatan", "zikui", "muzi", "yunduo", "kuaidao", "mowan", "yinxiu", "yaxiang", "tianyao", "ziteng", "tusi", "beifeng", "baiyi"]
//const value = 'xiu'
//const renderUsers = _(allUsers).chain().filter((v)=> {
//  return v.indexOf(value) !== -1;
//}).value();
//console.log(renderUsers.length);

const roles = [{id: 1, name: 'sys'}, {id: 2, name: 'dba'}, {id: 3, name: 'app'}, {
  id: 4,
  name: 'gues'
}]
const state = {roles: roles, role: {a: 'b'}};
//const roleName = 'app';
//const role = _(roles).chain().filter(v=> {
//  return v.name === roleName;
//}).head().value();
//console.log(role);
//console.log(_.findIndex(state.roles, ['id', 2]))


//let result = _.transform([5, 10, 4, 5, 6], function (result, n) {
//  result.push(n *= n);
//  return result.length!=3
//}, []);


//const str = "1,2,3,55";
//_.forEach(str, (x)=> {
//  console.log(/[\w,]/.test(x));
//});


//console.log(_.isUndefined(undefined));

//const s = 'abcdef';
//console.log(s.slice(s.length - 10, s.length))


const menus = [
  {
    type: 'user', title: '概要信息',
    children: [
      {to: '/', content: 'home'},
      {to: '/machine', content: 'machine'},
      {to: '/authority', content: 'authority'},
      {to: '/setting', content: 'setting'},
      {to: '/migration', content: '迁移任务'}
    ]
  },
  {
    type: 'laptop', title: '应用管理',
    children: [
      {to: '/apps', content: '列表管理'},
      {to: '/configMonitor', content: '告警配置'},
      {to: '/configKV', content: '先知KV'}
    ]
  },
  {
    type: 'notification', title: '迁移管理',
    children: [
      {to: '/machine', content: 'server节点'}
    ]
  }
];



