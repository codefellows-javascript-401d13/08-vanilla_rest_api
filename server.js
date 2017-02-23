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
  locker.fetchAllTeams('team')
  .then( teams => {
    let teamstring = teams.join(', ');
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write(teamstring);
    res.end();
  })
  .catch( err => {
    console.error(err);
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('schema not found');
    res.end();
  });
});

router.post('/api/team', function(req, res) {
  try {
    console.log(req.body.name, req.body.city);
    var team = new Team(req.body.name, req.body.city);
    locker.addTeam('team', team);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(team));
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

router.delete('/api/team', function(req, res) {
  if(req.url.query.id) {
    locker.removeTeam('team', req.url.query.id)
    .then( () => {
      res.writeHead(204);
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(400, {
        'Text-Content': 'text/plain'
      });
      res.write('bad request');
      res.end();
    });
    return;
  }
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
