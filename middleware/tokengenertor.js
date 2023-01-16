const jwt = require("jsonwebtoken");
require('dotenv').config();

const tokengenerator = ((user) => {
    const email = user.email;
    if (!user.token) {
        const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
        user.token = token;
        user.save().then( ()=> console.log("token save to db success") )
        console.log(token);
        return token;
            
    } else {
        console.log("already have token")
           
    }
});




module.exports = tokengenerator