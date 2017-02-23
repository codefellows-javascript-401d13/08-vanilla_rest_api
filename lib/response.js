'use strict';

module.exports = exports = {};

exports.useJSON = function(res, status, data){

  res.writeHead(status, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(data));
  res.end();
};

exports.useText = function(x,y,z){};
