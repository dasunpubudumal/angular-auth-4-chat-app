const express = require('express');
const router = express.Router();
const config = require('../config/db');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Register routes
router.post('/register', (req, res) => {

    let user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
    );

    User.addUser(user, (err, user) => {
        if(err) {
            res.json({success:false, msg:'Failed to register.'})
        } else {
            res.json({success:true, msg:'Successfully Registered the user.'})
        }
    });
});

//Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
       if(err) throw err;
       if(!user) {return res.json({success:false, msg:'User not found!'})}

       User.comparePassword(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){
              //Since jwt module has upgraded to its v8, jwt.sign(user.toJSON()) was used instead of jwt.sign(user).
              const token = jwt.sign(user.toJSON(), config.secret, {
                  expiresIn: 604800
              });

              res.json({
                  success: true,
                  token: 'JWT' + token,
                  user: {
                      id: user._id,
                      name: user.name,
                      username: user.username,
                      email: user.email
                  }
              })
          } else {
              res.json({success: false, msg:'Password Incorrect'});
          }
       });
    });
});

//Profile
router.get('/profile', (req, res) => {
    res.send('PROFILE');
});

module.exports = router;