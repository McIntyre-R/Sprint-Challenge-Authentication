const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/middleware.js')
const auth = require('./auth-model.js')

router.post('/register', (req, res) => {
  // implement registration
  let newUser = req.body

  const hash = bcrypt.hashSync( newUser.password, 6)
    newUser.password = hash
    auth.registerUser(newUser)
    .then(user => {
        res.status(201).json({message: 'Successfully registered'})
    })
});

router.post('/login', (req, res) => {
  // implement login
   
  let {username, password} = req.body
  auth.findBy({ username })
  .then(found => {
      if(found && bcrypt.compareSync(password, found[0].password)) {
          const token = generateToken(found[0])
          res.status(201).json({ message: "Woah dude nice", token: token})
      } else {
          res.status(401).json({ message: "woah dude can't find that info"})
      }
  }) 
  .catch(err => { console.log(err)
      res.status(500).json({error: err})})
});

module.exports = router;
