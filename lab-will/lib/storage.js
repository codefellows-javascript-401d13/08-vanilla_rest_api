'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function (schemaName, item) {
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expecteditem'));

  let json = JSON.stringify(item);
  return fs.writeFilrProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err))
};

exports.fetchItem = function (schemaName, id ) {
  if (!schemaName) return reject(new Error('expected schemaName'));
  if (!id) return reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString())
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err))
};

exports.deleteItem = function (schemaName) {
  return new Promise(function(resolve, reject) {
    if (!schemaName) return reject(new Error('expected schemaName'));
    if (!id) return reject(new Error('expected id'));

    var schema = storage[schemaName];

    if (!schema) return reject(new Error('schema not found'));

    var item = schema[id];
    if (!item) return reject(new Error('item not found'));

    // delete item;

    delete torage[schemaName];

    resolve(item);
  });
};
