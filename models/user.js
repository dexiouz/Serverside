const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: { type: String, minlength: 3, maxlength: 30, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, minlength: 5, },
	message: { type: String, required: true },
	publishedAt: { type: Date, default: Date.now() }
});

const User = mongoose.model("User", UserSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string().min(3).max(30).required(),
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		message: Joi.string().required()
	}
	return Joi.validate(user, schema)
}


exports.validate = validateUser;
exports.User = User;

//module.exports is equivalent to exports