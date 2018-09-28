
const express = require('express');
const mongoose = require('mongoose');
const {Users, validate} = require('../models/users.js');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  let users = await Users.findOne({ email: req.body.email });
  if(users) return res.status(400).send('User already registered');

  users = new Users(_.pick(req.body, ['name', 'email', 'password'])) 
  const salt = await bcrypt.genSalt(10);
  users.password= await bcrypt.hash(users.password, salt);
  await users.save();

  const token = users.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(users, ['_id', 'name', 'email']))
})   

module.exports = router

