const express = require('express');
const router = express.Router();
 const {Movie,validateMovie,} = require('../models/movie');
 const {Genre}= require('../models/genre');


 router.get('/', async (req,res)=>{
    try {
        const movie = await Movie.find().sort('name');
        if(!movie) return res.status(400).send('The databse is empty');
        res.send(movie);
    } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }

})


router.get('/:id', async (req,res)=>{
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(404).send('The given movie id doesn`t exist');
        res.send(movie);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }


});

router.post('/', async (req,res)=>{
  const {error} = validateMovie(req.body);
    if(error){
        return  res.status(400).send(error.details[0].message);
    }
    try {
    const genre = await  Genre.findById(req.params.genreId);
    if(!genre) return res.status(404).send('The given id does not exist');
         let movie = new Movie({
        title: req.body.title,
        genre:{//we set this to an object here because in a real world app we wouldnt want all properties of the genre displayed
            id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        displayRentalRate: req.body.displayRentalRate
    });
    movie = await movie.save();
    res.send(movie);
    } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
})

router.put('/:id', async (req, res)=>{
    const {error} = validateMovie(req.body);
    if(error){
    return  res.status(400).send(error.details[0].message);
    }
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, {
        $set:{
          title: req.body.title,
          numberInStock: req.body.numberInStock,
          displayRentalRate: req.body.displayRentalRate
          
        }
      }, {new:true});
    if(!movie) return res.status(404).send("The given movie id does not exist");
    res.send(movie);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  
  })

  router.delete('/:id',async (req,res)=>{
    try {
       const movie = await  Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send("The given genre id does not exist");
  
  res.send(movie);
    }
     catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });

  module.exports = router;