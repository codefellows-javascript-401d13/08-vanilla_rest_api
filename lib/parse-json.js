'use strict';

module.exports = function parseJSON(req) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      let reqBody = '';

      req.on('data', data => {
        reqBody += data.toString();
      });

      req.on('end', () => {
        try {
          req.body =JSON.parse(reqBody);
          resolve(req);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });

      req.on('error', err => {
        console.error(err);
        reject(err);
      });
    }
    resolve();
  });
};
