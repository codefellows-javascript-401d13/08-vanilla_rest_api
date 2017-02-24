'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createDog = function(schemaName, dog){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!dog) return Promise.reject(new Error('expected dog'));

  let json = JSON.stringify(dog);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${dog.id}.json`, json)
  .then( () => dog)
  .catch( err => Promise.reject(err));
};

exports.fetchDog = function(schemaName, id){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!id) return Promise.reject(new Error('expected id'));
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch ( err => Promise.reject(err));
};
