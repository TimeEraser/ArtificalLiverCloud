var _ = require('lodash')
//const add = (x)=> {
//  console.log(x);
//  return x + 3;
//};
//function* loadingTask() {
//  var value1 = yield 3;
//  var value2 = yield add(value1);
//  var value3 = yield add(value2);
//  var value4 = yield add(value3);
//}
//function scheduler(task) {
//  setTimeout(()=> {
//    var taskObj = task.next(task.value);
//    if (!taskObj.done) {
//      task.value = taskObj.value;
//      scheduler(task);
//    }
//  }, 0);
//}
//scheduler(loadingTask());


//var list = loadingTask();
//var ret = list.next();
//console.log(ret.value);
//ret = list.next();
//console.log(ret.value);

function *enumerable(msg) {
  console.log(msg)
  var msg1 = yield msg + '  after '
  console.log(msg1)
  var msg2 = yield msg1 + ' after'
  try {
    console.log(msg2)
    var msg3 = yield msg2 + ' after'
    console.log('ok')
  }
  catch (e) {
    console.log(e)
  }
  console.log(msg2 + ' over')
}

// 初始化迭代器
var enumerator = enumerable('hello')
var ret = enumerator.next() // 控制台显示 hello，ret的值{value:'hello after',done:false}
console.log(ret)
ret = enumerator.next(ret.value) // 控制台显示 world，ret的值{value:'world after',done:false}
//console.log(ret)
//ret = enumerator.next('game') // 控制台显示game，ret的值{value:'game after',done:false}
//console.log(ret)
//ret = enumerator.next();
//console.log(ret);
