const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const {userSchema,User, validate} = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

router.get('/me', auth, async (req,res)=>{
     const user = await User.findById(req.user._id).select('-password');
     res.send(user);
});

router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //now we check if the user already exist
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User already registered");
    try{
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save() ;
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).status(201).send(_.pick(user, ['name', 'email']));
    }catch (e){
        console.log(e); 
        return res.status(500).send("Internal error")
    }
    
})

module.exports = router;