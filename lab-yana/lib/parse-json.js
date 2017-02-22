'use strict';

module.exports = function(req) { //this takes a request object since that is where unparsed JSON is coming from
  return new Promise((resolve, reject) => {
    if (req.method === 'POST' || req.method === 'PUT') { //make sure it's a POST or PUT method
      var body = ''; //this variable is to add request chunks to incrementally
      req.on('data', data => { //when data is coming, do this with it...
        body += data.toString(); //add new chunk to previous chunk conglomeration after stringifying
      });
      req.on('end', () => {
        try {
          req.body = JSON.parse(body); //parse the data from the request
          resolve(req); //resolve the promise to signify successful parsing of data
        } catch (err) { //if try doesn't work...
          console.error(err); //print error to console
          reject(err); //reject promise to signify that we did not successfully parse the JSON
        }
      });
      req.on('error', err => { //if an error occurs (e.g., we did not get data)
        console.error(err); //print error to console
        reject(err); //reject promise because we didn't successfully get data
      });
      return; //this is so the final resolve() doesn't get run regardless of anything before... I think
    }
    resolve(); //just in case we somehow end up in this function and we don't enter if statement
  });
}
