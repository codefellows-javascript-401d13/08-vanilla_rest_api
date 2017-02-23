'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));
  if (!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('schema name expected'));
    if (!id) return reject(new Error('id expected'));

    var schema = storage[schemaName];
    if (!schema) return reject(new Error('schema not found'));

    var item = schema[id];
    if (!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.deleteItem = function(schemaName, id){
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('schema name expected'));
    if (!id) return reject(new Error('id expected'));

    var schema = storage[schemaName];
    if (!schema) return reject(new Error('schema not found'));

    var item = schema[id];
    if (!item) return reject(new Error('item not found'));
    storage[schemaName][item.id] = '';

    resolve(item);
  });
};