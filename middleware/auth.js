const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('No token provided');
    //Now we very the token 
    try {
       const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
       req.user = decoded;
       next();
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid token');
    }

}