const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const {userSchema,User,} = require('../models/user');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //now we check if the user already exists
     let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid details");
    try{
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if(!isValid) return res.status(400).send("Invalid details");
        const token = user.generateAuthToken(); 
        res.send(token);
    }catch (e){
        console.log(e.message);
        return res.status(500).send("Internal error");
    }
    
})


function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(8).required(),

    })
    return schema.validate(req);
}
module.exports = router;