'use strict';

const lockerRoom = {};

module.exports = exports = {};

exports.addTeam = function(schemaName, team) {
  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!team) return Promise.reject(new Error('expected team'));

  if (!lockerRoom[schemaName]) lockerRoom[schemaName] = {};

  lockerRoom[schemaName][team.id] = team;
  return Promise.resolve(team);
};

exports.fetchTeam = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema'));
    if (!id) return reject(new Error('expected id'));

    let schema = lockerRoom[schemaName];
    if (!schema) return reject(new Error('schema not found'));

    let team = schema[id];
    if (!team) return reject(new Error('team not found'));

    resolve(team);
  });
};

exports.removeTeam = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema'));
    if (!id) return reject(new Error('expected id'));

    let schema = lockerRoom[schemaName];
    if (!schema) return reject(new Error('schema not in storage'));

    let team = schema[id];
    if (!team) return reject(new Error('team not found'));
    console.log(team);
    delete lockerRoom[schemaName][id];
    return resolve();
  });
};

exports.fetchAllTeams = function(schemaName) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('expected schema'));

    let schema = lockerRoom[schemaName];
    if (!schema) return reject(new Error('schema not found'));

    let teamIds = Object.keys(schema);
    if (!teamIds) return reject(new Error('no team ids found'));

    resolve(teamIds);
  });
};
