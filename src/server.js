'use strict';

//------------------------------// Third Party Resources \\----------------------------\\
const express = require('express');
const cors = require('cors');

//---------------------------------// Import Resources \\-------------------------------\\
const employeesRouter = require('./routes/employees');
const notFoundHandler = require('./middlewares/404');
const errorHandler = require('./middlewares/500');

//-------------------------------// App Level Middleware \\-----------------------------\\
const app = express();
app.use(cors());
app.use(express.json());

//--------------------------------------// Routes \\--------------------------------------\\
app.use('/v1/employees', employeesRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

//-----------------------------------// Export Module \\-----------------------------------\\
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`up and running on ${port}`);
    });
  },
};

//-----------------------------------------------------------------------------------------\\

