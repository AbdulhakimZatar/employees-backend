'use strict';

//------------------------------// Third Party Resources \\----------------------------\\
const express = require('express');
const cors = require('cors');

//---------------------------------// Import Resources \\-------------------------------\\
const employeesRouter = require('./routes/employees');
const departmentsRouter = require('./routes/departments');
const notFoundHandler = require('./middlewares/404');
const errorHandler = require('./middlewares/500');

//-------------------------------// App Level Middleware \\-----------------------------\\
const app = express();
app.use(cors());
app.use(express.json());

//--------------------------------------// Routes \\--------------------------------------\\
app.use('/v1/employees', employeesRouter);
app.use('/v1/departments', departmentsRouter);
app.get('/v1',(req,res)=>{
 res.json({version: '1.0.0'});
})

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

