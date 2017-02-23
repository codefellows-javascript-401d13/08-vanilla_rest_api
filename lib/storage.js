'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if(!schemaName) return Promise.reject(new Error('No schema name provided'));
  if(!item) return Promise.reject(new Error('No item provided'));
  if(!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('No schema name provided'));
    if(!id) return reject(new Error('no id provided'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('Schema not found'));

    var item = schema[id];
    if(!item) return reject(new Error('Item not found'));

    resolve(item);
  });
};

exports.deleteItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    exports.fetchItem(schemaName, id)
    .then(guitar => {
      delete storage[schemaName][guitar.id];
      resolve();
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
};
