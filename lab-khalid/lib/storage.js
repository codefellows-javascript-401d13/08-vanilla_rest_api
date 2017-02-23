'use strict';
const storage = {}
module.exports = exports = {};

exports.createItem = function(schemaname, item){
  if(!schemaname) return Promise.reject(new Error('Schema name not provided'));
  if(!item) return Promise.reject(new Error('Item not provided'));
  if(!storage[schemaname]) storage[schemaname] = {};

  storage[schemaname][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(schemaname, id) {
  return new Promise((resolve, reject) => {
    if(!schemaname) return reject(new Error('Schema name not Proveded'));
    if(!id) return reject(new Error('Id not provided'));

    var schema = storage[schemaname];
    if(!schema) reject(new Error('Schema not found'));
    var item = schema[id];
    console.log(item);
    if(!item) return reject(new Error('this Item not found'));

    resolve(item);
  });
};

exports.deleteItem = function(schemaname, id) {
  return new Promise((resolve, reject) => {
    if(!schemaname) return reject(new Error('Schema name not provided'));
    if(!id) return reject(new Error('Id not provided'));
    if(!storage[schemaname]) return reject(new Error('Schema not found'));
    if(!storage[id]) return reject(new Error('Item not found'));

    delete storage[schemaname][id];
  });
};
