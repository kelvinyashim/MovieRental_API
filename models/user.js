const mongoose = require('mongoose');
const Joi = require("joi");
const { required } = require('joi/lib/types/lazy');
const config = require('config');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        minlength: 5,
        maxlength:50,
        unique :true ,
        required:true
    },
    password: {
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
    }
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

// Validation with JOI
function validate(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(8).required(),

    })
    return schema.validate(user);
}


module.exports = {
    userSchema,
    User,
    validate

}