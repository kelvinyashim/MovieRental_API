const express = require('express');
const router = express.Router();
const {Rental,validateRental} = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');


  
  
  
  router.post('/', async (req,res)=>{
      //we create a new genre object
      //but first we handle user input
    const {error} = validateRental(req.body);
    if(error){
    return  res.status(400).send(error.details[0].message);
    }
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send("The given customer id is invalid");

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send("The given customer id is invalid");

    if(movie.inStock === 0) return res.status(400).send("Movie not in stock");
  try {
    let rental = new Rental ({
      customer: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone
      },
      movie: {
        id: movie.id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,

      },
    });
    rental = await rental.save();
    //now our movie in stock wouldve decreamented by 1
    movie.inStock--;
    movie.save();
    res.send(rental); 
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
      }
  
  })
  
  
  router.get('/', async (req,res)=>{
    try {
       const rental = await Rental.find().sort({dateOut:-1});
       if(!rental) return res.status(400).send('The database is empty');
      res.send(rental);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error')
    }
     
  });
  
  router.get('/:id', async (req,res) =>{
      //look whether the genre exist
      //if it doesnt handle error
      try {
         const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send("The given genre id does not exist");
    res.send(rental);
  
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
      }
   
  })
  
  router.delete('/:id',async (req,res)=>{
    try {
       const rental = await  Rental.findByIdAndRemove(req.params.id);
    if(!rental) return res.status(404).send("The given genre id does not exist");
  
  res.send(rental);
    }
     catch (error) {
      console.log(error);
      res.status(500).send('Internal server error')
    }
  });
  
  
  
  module.exports = router;