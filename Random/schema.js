const mongoose = require('mongoose');

const saveUser =new mongoose.Schema({
  'username': { type: String, required: true },
  'email': {type: String, required: true},
  'password': {type: String, required: true}
});

const saveUsername = mongoose.model('saveUser', saveUser)

module.exports = {
  saveUsername,
};



// kill mongod: sudo lsof -iTCP -sTCP:LISTEN -n -P
