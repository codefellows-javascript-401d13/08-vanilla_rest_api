'use strict';

const PORT = 3002;
const http = require('http');
const server = http.createServer();

server.listen(PORT, () => { console.log('server up', PORT) } );
