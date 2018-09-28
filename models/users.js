const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	name: { 
    type: String,
    minlength: 5, 
    maxlength: 50, 
    required: true 
  },
  email: { 
    type: String,
    minlength: 5, 
    maxlength: 255, 
    required: true,
    unique: true 
  },             
  password: { 
    type: String,
    minlength: 5, 
    maxlength: 1024, 
    required: true,
  },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey' ));
  return token ;
}
const Users = mongoose.model("Users", userSchema);

function validateUsers(users) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(5255).required().email(),
		password: Joi.string().min(5).max(51024).required()
	}
	return Joi.validate(users, schema)
}


exports.validate = validateUsers;
exports.Users = Users;
