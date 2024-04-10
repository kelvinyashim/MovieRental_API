const mongoose = require('mongoose');
const  express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser:true, useUnifiedTopology:true,}).then(()=> console.log("Connected to the Db successfully")).catch(error=> console.log("The program ran into ann error",error));

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movie');
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);




const port = process.env.PORT || 7000;
app.listen(port,()=>console.log(`Listening on port ...${port}`));