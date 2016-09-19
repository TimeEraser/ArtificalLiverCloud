var _ =require('lodash');
var users = [
  {'user': 'barney', 'age': 36, 'active': true},
  {'user': 'fred', 'age': 40, 'active': false}
];

console.log(_.filter(users, function (o) {
  return !o.active;
}));
console.log(users);
