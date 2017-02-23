'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if(!schemaName) return Promise.reject(new Error('expected a schemaName'));
  if(!item) return Promise.reject(new Error('expected a item'));
  if(!storage[schemaName]) storage[schemaName] = {};
  storage[schemaName][item.id] = item;
  console.log('this is storage after it has been created', storage);
  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id){
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('expected a schemaName'));
    if(!item) return reject(new Error('expected a item'));
    if(!storage[schemaName][id]) return reject(new Error('Item or schema does not exist in Storage'));
    var schema = storage.schemaName;
    var item = schema[id];
    resolve(item);
  });
};
