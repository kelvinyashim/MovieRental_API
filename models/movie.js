const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} =  require('./genre');
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        minlenght: 5,
        maxlength: 50,
        required:true
    },
    genre: {
        type:genreSchema,
        required:true
    },
    numberInStock:  {
        type: Number,
        required:true
    },
    dailyRentalRate: {
        type: Number,
        required:true,
    }
}
    )
const Movie =  mongoose.model('Movies', movieSchema);

function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.required(),
        numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
    }

    return Joi.validate(movie, schema);

}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
module.exports.genreSchema = genreSchema;
