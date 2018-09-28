const express = require('express');
const logger = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api')
 
//connecting to MongoDB
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/mydb')
    .then(() => { console.log('connected to mongoDb')})
    .catch((error) => {console.log(`failed to connect to mongoDb ${error.message}`)});


const app = express();

app.use(logger('tiny'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use('/api/users', userRoutes);
app.get('/', (req, res) =>{
    res.json('HELLO FROM EXPRESS API');
})
app.listen(port, () => console.log(`server is running on port ${port}`));