const express = require('express');
const router = express.Router();

//Register routes
router.get('/register', (req, res) => {
   res.send('REGISTER PAGE');
});

//Authenticate
router.get('/authenticate', (req, res) => {
    res.send('AUTHENTICATE');
});

//Profile
router.get('/profile', (req, res) => {
    res.send('PROFILE');
});

//Validate
router.get('/validate', (req, res) => {
    res.send('VALIDATE');
});



module.exports = router;