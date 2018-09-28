const express = require('express');
// const User = require('../models/user.js')
const {User, validate} = require('../models/user.js')
const router = express.Router();

router.get('/login', async (req, res) => {
    const user = await user.find();
    res.json(user);
})

router.post('/', async (req,res) =>{
    const { error } = validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password,
        message: req.body.message
    })
    await user.save();
     res.json(user);
})


//to update
    //params is extra info supplied to the route, the added id is d params
    router.put('/:id', async (req, res) =>{
        const { error } = validate (req.body);
        if(error)  return res.status(400).json(error.details[0].message);

        const user = await User.findByIdAndUpdate(req.params.id,req.body);
        if(!user) return res.stautus(400).json('Bad request.');
        await user.save(); 
        res.json(user);

    })
     

     

router.delete('/:id',async (req,res)=>{
    const user = await User.findByIdAndRemove(req.params.id);
    
    res.json
})

module.exports = router