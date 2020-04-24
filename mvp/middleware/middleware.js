/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../api/secrets')

module.exports = {
 authenticator,
 generateToken
};

function  authenticator(req,res,next){
  const token =  req.headers.authorization
  if(token) {
  jwt.verify(token, "keep it secret, keep it safe!", (error, decodedToken) => {
  if(error) {
      res.status(401).json({message: "owo notices error"})
  } else {
      req.decodedToken = decodedToken
      next();
  }
  })
} else {
  res.status(401).json({message: "sign in dude"})
}
};



function  generateToken(user){
  const payload = {
      userId: user.id,
      username: user.username
  }
  const secret = process.env.JWT_SECRET || jwtSecret;
  const options = {
      expiresIn: '1d'
  }
  return jwt.sign(payload, secret, options)

}