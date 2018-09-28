const config = require('config');
const Joi = require('joi');
const express = require('express');
const logger = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}
 
mongoose.connect('mongodb://localhost:27017/MoshDB',{ useNewUrlParser: true })
    .then(() => { console.log('connected to mongoDb')})
    .catch((error) => {console.log(`failed to connect to mongoDb ${error.message}`)});

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', auth);


const port = process.env.PORT || 6000;
app.listen(6000, () => console.log(`server is running on port ${port}`));

