//From last time (2017-12-29): Have to watch part 8.

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

const app = express();

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to ' , config.database);
});

mongoose.connection.on('error', (error) => {
    console.log('Error in mongo database: ' , error);
});

//User Routes (User Controller)
const users = require('./routes/users');

//Express Port
const PORT = 3000;
/*
==========================
Injecting the dependencies
==========================
*/

//Cors module to block invalid requests from invalid endpoints.
app.use(cors());
//To parse data from requests.
app.use(bodyParser.json());
//Authentication
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//User Controller
app.use('/users',users);
//Angular
app.use(express.static(path.join(__dirname, 'public')));

/*
=========================
Declaring invalid routes
=========================
 */

//Root route declared. However this will be served by the front end.
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

//Express server
app.listen(PORT,() => {
    console.log('Server running on port ', PORT);
});