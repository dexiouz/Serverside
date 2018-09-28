const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/playground')
  .then(()=> console.log('connected to mongo database '))
  .catch(err => console.log('could not connect to Mongodb', err))
  //schema is used to define the shape of documents in a  mongodb collection.

  const courseSchema = new mongoose.Schema({  
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
  })