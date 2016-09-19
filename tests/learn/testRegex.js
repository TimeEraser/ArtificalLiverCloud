/**
 * Created by benchu on 16/3/5.
 */
'use strict'
let reg = /.*?at.alicdn.com\/t\/font.*/;

let path1 = 'http://at.alicdn.com/t/font_1434092639_4910953.eot?#iefix';
let path2 = 'http://at.alicdn.com/t/font_1434092639_4910953.woff?#iefix';
let path3 = 'http://at.alicdn.com/t/font_1434092639_4910953.woff2?#iefix';
console.log(reg.test(path1))
console.log(reg.test(path2))
console.log(reg.test(path3))


