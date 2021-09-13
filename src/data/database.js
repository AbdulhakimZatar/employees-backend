'use strict';

//------------------------------// Third Party Resources \\----------------------------\\
const pg = require('pg');
require('dotenv').config();

//--------------------------------// Esoteric Resources \\------------------------------\\
const connectionString = process.env.DATABASE_URL;

//----------------------------------// Export The Module \\----------------------------------\\
module.exports = new pg.Client(connectionString);

//---------------------------------------------------------------------------------------\\
