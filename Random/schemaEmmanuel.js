const mongoose = require('mongoose');

const saveAccount =new mongoose.Schema({
  "_id:": mongoose.Schema.ObjectId,

  "username": String,
  "email": String,
  "password": String,
});
const saveUserAccount = mongoose.model('saveAccount', saveAccount); 



// const LoginAccount = mongoose.Schema({
//   _id: mongoose.Schema.ObjectId,
//   "username": String,
//   "password": string,
// });
// const LoginAccount = mongoose.model('LoginAccount', LoginAccount); 

module.exports = {
  saveUserAccount,
  // LoginAccount
};

