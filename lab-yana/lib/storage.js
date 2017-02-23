'use strict';

const Promise = require('bluebird'); //library that allows us to promisify modules
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' } ); //any function with that suffix has been promisified

module.exports = exports = {};

exports.createItem = function(schemaName, item) { // called for POST
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!item) return Promise.reject(new Error('expected item'));
  console.log('in create item, the item is: ', item);
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item) //return item (blog in this case) object; blog-route.js gets response
  .catch(err => Promise.reject(err)); //reject promise if file isn't successfully written;
};

exports.fetchItem = function(schemaName, id) { //called for GET
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try { return JSON.parse(data.toString()); }
    catch (err) { return Promise.reject(err); }
  })
  .catch (err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( () => id)
  .catch(err => { return Promise.reject(err); }) ;
};

exports.fetchList = function(schemaName) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  fs.readdirProm(`${__dirname}/../data/${schemaName}/`)
  .then(list => {
    try {
      if (list.length === 0) return Promise.resolve('no blog entries available');
      return list;
    } catch(err) { return Promise.reject(err); }
  })
  .catch(err => { return Promise.reject(err); } );
};
