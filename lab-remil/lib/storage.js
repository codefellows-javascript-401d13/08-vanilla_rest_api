'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function createItem(schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('schema not provided'));
  if (!item) return Promise.reject(new Error('item not provided'));

  if (!storage[schemaName]) storage[schemaName] = {};
  storage[schemaName][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = function fetchItem(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return Promise.reject(new Error('schema not provided'));
    if (!id) return Promise.reject(new Error('id not provided'));

    let schema = storage[schemaName];
    if (!schema) return reject(new Error('schema not found'));

    let item = schema[id];
    if (!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.deleteItem = function deleteItem(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return Promise.reject(new Error('schema not provided'));
    if (!id) return Promise.reject(new Error('id not provided'));

    let schema = storage[schemaName];
    if (!schema) return reject(new Error('schema not found'));

    let item = schema[id];
    if (!item) return reject(new Error('item not found'));

    console.log(storage);
    delete storage[schemaName][id];
    console.log(storage);
    resolve();
  });
}
