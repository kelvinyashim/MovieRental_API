const  express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema=   new  mongoose.Schema({
  name: {type: String, required:true}
})

const Genre = mongoose.model('Genre', genreSchema);


router.put('/:id', async (req, res)=>{
  const {error} = validateGenre(req.body);
  if(error){
  return  res.status(400).send(error.details[0].message);
  }
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
      $set:{
        name: req.body.name
      }
    }, {new:true});
  if(!genre) return res.status(404).send("The given genre id does not exist");
  res.send(genre);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }

})




router.post('/', async (req,res)=>{
    //we create a new genre object
    //but first we handle user input
  const {error} = validateGenre(req.body);
  if(error){
  return  res.status(400).send(error.details[0].message);
  }
try {
  let genre = new Genre ({
    name: req.body.name //here we assuming a name would be passed to request //to be able to get the name from req we have to allow express use json
  });
  genre = await genre.save();
  res.send(genre); 
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }

})


router.get('/', async (req,res)=>{
  try {
     const genre = await Genre.find().sort({name:1});
     if(!genre) return res.status(400).send('The database is empty');
    res.send(genre);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error')
  }
   
});

router.get('/:id', async (req,res) =>{
    //look whether the genre exist
    //if it doesnt handle error
    try {
       const genre = await Genre.findById(req.params.id);
  if(!genre) return res.status(404).send("The given genre id does not exist");
  res.send(genre);

    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error')
    }
 
})

router.delete('/:id',async (req,res)=>{
  try {
     const genre = await  Genre.findByIdAndRemove(req.params.id);
  if(!genre) return res.status(404).send("The given genre id does not exist");

res.send(genre);
  }
   catch (error) {
    console.log(error);
    res.status(500).send('Internal server error')
  }
});


function validateGenre(genre){
  const schema = {
    name: Joi.string().min(5).required()
};
return  Joi.validate(genre, schema);
}

module.exports = router;