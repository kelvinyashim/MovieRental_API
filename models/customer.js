const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {type: String, required:true, minlength: 5, maxlength:20},
    isGold:{type: Boolean, default:false},
    phone:{type:Number, required:true, minlength: 5, maxlength:20 }
})

 const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = {
      name: Joi.string().min(5).required(),
      phone: Joi.string().min(5).required(),
      isGold: Joi.boolean()
  };
  return  Joi.validate(customer, schema);
  }

  module.exports.Customer = Customer;
  module.exports.validateCustomer = validateCustomer;