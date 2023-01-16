const jwt = require("jsonwebtoken");
const User = require("../model/user");
require('dotenv').config();


const auth = (async (req, res, next) => {
  const { authorization } = req.headers
  console.log(authorization)
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in..." })
  };
  
  const token = authorization
  const decoded = jwt.verify(token, process.env.TOKEN_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" })
    }
    const { user_id } = payload
    User.findById(user_id).then(userdata => {
      req.user = userdata
      //
      // res.status(200).json(userdata)
      //
      console.log("from auth ..", userdata)
      next()
    })
  });

});

module.exports = { auth };