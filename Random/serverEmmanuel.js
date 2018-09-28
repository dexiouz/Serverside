const 
  // // DBURL = process.env.DBURL,
  // DBURL = 'mongodb://dexiouz:royal1347@ds135852.mlab.com:35852/mydatabase',
  DBURL = 'mongodb://localhost:27017/mydb'
  Promise = require('bluebird'),
  mongoose = require('mongoose'),
  express = require('express'),
  schemas = require('./schemaEmmanuel.js'),
  app = express(),
  options = {
    useNewUrlParser: true,
    promiseLibrary: Promise,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    socketTimeoutMS: 0,
    keepAlive: true,
    autoIndex: false
  };

let db;

app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  if (req.method === "OPTIONS") {
    return res.end()
  }
  next();
})

app.use(express.json());

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('DataBase connection closed, app termination');
    process.exit(0);
  });
});

function connectToDB() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DBURL, options);
    db = mongoose.connection;
    db.on('error', err => {
      console.error(`DataBase connection error ${err}`);
      return reject(`Error connecting to mongodb ${err}`)
    });
    db.once('connected', () => {
      console.info(`Connection successful`);
      return resolve(true);
    });
    db.once('disconnected', () => {
      console.info('Disconnected successfully');
    });
  });
}

connectToDB()
  .then(ok => {
    console.log('connection ok');
  })


app.post('/saveinfo', async(req, res) => {
  console.log(req.body)
  try {
    //try and validate for instance 
    //let username = req.body.username
    // if(username == ''){
    //   alert('invalid')
    // }
    let saveUser = new schemas.saveUserAccount(req.body);
    let result = await saveUser.save();
    res.json(result);
    res.send("Saved successfully");
    console.log("Saved user account", result);
  }
  catch (err) {
    console.error("Couldnt save user account", err);      
  }

})

app.listen(5000, () => {
  console.log("Listening on port", 5000);
})