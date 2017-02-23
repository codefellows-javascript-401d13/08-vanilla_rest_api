'use strict';

const Sneaker = require('./model/sneaker.js');
const storage = require('./lib/storage.js');

console.log(new Sneaker('model ayo','ayo brand'));
console.log('storage', storage);

storage.createItem('sneaker', {id: 'nike air max'}).then(() => {
  console.log('storage', storage);
});
