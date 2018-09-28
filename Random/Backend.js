const
 mongoose = require('mongoose'),
  schemas = require('./schema.js'),
  express = require('express'),
  bodyparser = require('body-parser');
  app        = express();

  app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    if (req.method === "OPTIONS") {
      return res.end()
    }
    next();
  })
mongoose
  .connect('mongodb://localhost:27017/usernameDB', {useNewUrlParser: true})
  .then(()=> console.log('connected to mongodb'))
  .catch(err => console.log('could not connect to mongodb', err))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.post('/Backend',(req,res) =>{
  const {username, email, password} = req.body;
  console.log(username, email, password)
  if(username === ''){
    res.json({ message: 'empty'})
  }else if(!email === ''){
    res.json({ message: 'empty'})
  }else if(password === ' '){
    res.json({ message: 'empty'})
  }
  else{
    new schemas.saveUsername({
      username, email,password
    }).save()
      .then((result)=>{
        res.json({ message: result })
      })
      .catch((error) => console.log('error', error))
  }
})

app.listen(5000, () => console.log('Server is running on port 5000'));

