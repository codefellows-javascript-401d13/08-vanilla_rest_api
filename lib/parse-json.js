'use strict';

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      var body = '';

      req.on('data', data => {
        console.log('the data as it comes in', data)
        body += data.toString();
      });

      req.on('end', () => {
        console.log('Body once complete', body);
        try {
          req.body = JSON.parse(body);
          console.log('Body once parsed', req.body);
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

      return;
    }

    resolve();
  });
};
