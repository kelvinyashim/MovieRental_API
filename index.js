const mongoose = require('mongoose');
const  express = require('express');
const config = require('config');
const app = express();


if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR: jwtPrivateKey is not set");
    process.exit(1); 
}

mongoose.connect('mongodb://localhost/vidly',).then(()=> console.log("Connected to the Db successfully")).catch(error=> console.log("The program ran into ann error",error));

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movie');
const users = require('./routes/user');
const auth = require('./routes/auth');
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);




const port = process.env.PORT || 7000;
app.listen(port,()=>console.log(`Listening on port ...${port}`));