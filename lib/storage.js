'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require(fs), { suffix: 'Prom' });

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if(!schemaName) return Promise.reject(new Error('No schema name provided'));
  if(!item) return Promise.reject(new Error('No item provided'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch(err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('No schema name provided'));
    if(!id) return reject(new Error('no id provided'));

    fs.fileReadProm(`${__dirname}/data/${schemaName}/${id}/.json`)
    .then(data => {
      let item = JSON.parse(data.toString());
      return resolve(item);
    })
    .catch(err => {
      console.error(err);
      return reject(err);
    });
  });
};

exports.deleteItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    fs.unlinkProm(`${__dirname}/data/${schemaName}/${id}.json`)
    .then( () => resolve())
    .catch(err => {
      console.error(err);
      return reject(err);
    });
  });
};
