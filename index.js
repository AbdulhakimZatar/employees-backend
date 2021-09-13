'use strict';

//---------------------------------// Import Resources \\-------------------------------\\
const server = require('./src/server');
const client = require('./src/data/database');
require('dotenv').config();

//--------------------------------// Server Connection \\--------------------------------\\
const PORT = process.env.PORT || 5000

client.connect().then(() => {
  server.start(PORT);

}).catch((err) => {
  console.error(err.message);
});
//---------------------------------------------------------------------------------------\\