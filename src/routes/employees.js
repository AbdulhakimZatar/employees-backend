'use strict';

//------------------------------// Third Party Resources \\----------------------------\\
const express = require('express');

//---------------------------------// Import Resources \\-------------------------------\\
const employee = require('../models/employee');

//-------------------------------// App Level Middleware \\-----------------------------\\
const router = express.Router();

//--------------------------------------// Routes \\--------------------------------------\\

router.get('/', async (req, res) => {

  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const offset = (page - 1) * limit;

  const search = req.query.search || '';
  const type = req.query.type || 'name';
  
  let employees = {}
  if (search.length > 0) {
    employees = await employee.search(search, type, limit, offset)
  } else {
    employees = await employee.getAll( limit, offset);
  }
  res.status(200).json(employees);
})

router.post('/seed',(req, res) => {
 const num = req.body.num || 100; 
 employee.seed(num);
 res.status(200).json({message: 'Seeded'});
})

//-----------------------------------// Export Module \\-----------------------------------\\
module.exports = router;

//-----------------------------------------------------------------------------------------\\
