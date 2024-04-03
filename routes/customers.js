const express = require('express');
const router = express.Router();
const {Customer,validateCustomer} = require('../models/customer')



 router.get('/:id', async (req,res)=>{ 
        try {
       const customer = await  Customer.findById(req.params.id);
  if(!customer){
    return res.status(404).send("The given customer id does not exist");
  }
  res.send(customer);
  
    } catch (error) {
console.log(error);
res.status(500).send("Internal server error");        
    }
 });


 router.get('/', async (req,res)=>{
    try {
     const customer = await Customer.find().sort({name:1});
   if(!customer) return res.status(400).send("The database is empty");
   res.send(customer);
     
    } catch (error) {
        console.log(error);
res.status(500).send("Internal server error"); 
    }
 });

 router.put('/:id', async (req,res)=>{
    try {
         const {error} =  validateCustomer(req.body);
    if(error) return res.send(error.details[0].message);

  const customer = await  Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }
    }, {new:true});

    res.send(customer);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error"); 
    }
 });

 router.post('/', async (req,res)=>{
   const {error} =  validateCustomer(req.body);
    if(error) return res.send(error.details[0].message); 
     try {    
    let customer = new Customer({
        name : req.body.name,
        phone : req.body.phone,
        isGold : req.body.isGold,
    })
 customer =  await customer.save();
 res.send(customer);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error"); 
    }
 });



  module.exports = router;