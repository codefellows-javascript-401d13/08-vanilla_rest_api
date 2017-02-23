'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const Team = require('./model/team.js');
const locker = require('./lib/team-storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/team', function(req, res) {
  if (req.url.query.id) {
    locker.fetchTeam('team', req.url.query.id)
    .then( team => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(team));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('team not found');
      res.end();
    });
    return;
  }

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});


const server = http.createServer(Router.route());

server.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
