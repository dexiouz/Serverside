const config = require('config')
const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const {Users} = require('../models/users.js');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  let users = await Users.findOne({ email: req.body.email });
  if(!users) return res.status(400).send('invalid email or password');

 const validPassword = await bcrypt.compare(req.body.password, users.password)
 if(!validPassword) return res.status(400).send('Invalid email or password')
 
 const token = users.generateAuthToken();

 res.send(token);
})

function validate(req) {
	const schema = { 
		email: Joi.string().min(5).max(5255).required().email(),
		password: Joi.string().min(5).max(51024).required()
	}
	return Joi.validate(req, schema)
}


module.exports = router

