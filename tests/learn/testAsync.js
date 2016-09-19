/**
 * Created by benchu on 16/3/6.
 */
var co = require('co');
co(function *() {
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
});

const f = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 2000);
  });
};

const testAsync = async () => {
  const t = await f();
  return Promise.resolve(t + 100);
};

const testAsync2 = async () => {
  const t = await testAsync();
  console.log(t);
  return Promise.resolve(t + 100);
};
(async () => {
  const t = await testAsync2();
  console.log(t);
})();
