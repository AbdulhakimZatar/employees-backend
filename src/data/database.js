'use strict';

//------------------------------// Third Party Resources \\----------------------------\\
const pg = require('pg');
require('dotenv').config();

//--------------------------------// Esoteric Resources \\------------------------------\\
const connectionString = process.env.DATABASE_URL || 'postgresql://snake:snake1337@198.84.76.250:5432/pwc';

//----------------------------------// Export The Module \\----------------------------------\\
module.exports = new pg.Client(connectionString);

//---------------------------------------------------------------------------------------\\
