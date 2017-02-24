'use strict';

const http = require('http');
const Dog = require('./model/dog.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/dog', function(req,res){
  if(req.url.query.id){
    storage.fetchItem('dog', req.url.query.id)
    .then( dog => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(dog));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type':'text/plain'
      });
      res.write('not found');
      res.end();
    });
    return;
  }

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('BAD REQUEST USING THE ' + req.method + ' method');
  res.end();
});

router.post('/api/dog', function(req,res){
  try {
    console.log('request body: ', req.body);
    var dog = new Dog(req.body.name, req.body.breed);
    storage.createItem('dog', dog);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(dog));
    // res.write('\nYou used the ' + req.method + ' method.');
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/dog', function(req,res){
  if(req.url.query.id){
    console.log('here is your query string id:', req.url.query.id);
    storage.deleteItem('dog', req.url.query.id)
    .then( dog => {
      res.writeHead(204, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(dog));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type':'text/plain'
      });
      res.write('not found');
      res.end();
    });
    return;
  }

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('BAD REQUEST USING THE ' + req.method + ' method');
  res.end();
});
////////

const server = http.createServer(router.route());


server.listen(PORT, () => {
  console.log('server up on:', PORT);
});
