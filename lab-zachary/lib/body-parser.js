'use strict';
//parse body requests on POST and put. Uses promises to parse the JSON body of the request
module.exports = function(req){
  return new Promise((resolve, reject) =>{
    if( req.method === 'PUT' || req.method == 'POST'){
      var body = '';

      req.on('data' , data => {
        body += data.toString();
      });

      req.on('end', () =>{
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch (err){
          console.error(err);
          reject(err);
        }
      });
      req.on('error', err =>{
        console.error(err);
        reject(err);
      });
      return;
    }
    resolve();
  });
};

