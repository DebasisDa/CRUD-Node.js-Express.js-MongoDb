const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
let bodyParser = require('body-parser');
const helmet = require('helmet') // This is third party middleware.
const morgan = require('morgan') // This is thirdpparty middleware.


// connect with database
mongoose.connect('mongodb://localhost/project')
.then(() => console.log('connected with database ...'))
.catch( error => console.error('could not connect with database ...', error));

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());
app.use(helmet()) // Third party middleware.
app.use(morgan())  // Third party middleware.

// List of APIs
app.use('/api/users',user);

/* This code abour port number */
const port = process.env.PORT||3000;
app.listen(port, () => console.log('Listening on the port' + port));



















