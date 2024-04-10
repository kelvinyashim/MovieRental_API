const mongoose = require('mongoose');
const Joi = require('joi');
const { type } = require('joi/lib/types/object');
const { required } = require('joi/lib/types/lazy');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength:5,
                maxlength:50,
                required: true
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                minlength:5,
                maxlength:50,
                required: true
            },

        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                minlength:5,
                maxlength:250,
                required: true,
                trim: true
            },
            displayRentalRate: {
                type: Number,
                min: 0,
                max:255,
                required:true
            },
        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rentals', rentalSchema);


function validateRental(rental){
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    }
    return Joi.validate(rental,schema);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
 