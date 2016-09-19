/**
 * Created by Ozgen on 9/7/16.
 */
// main start of the server

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
var app = express();
app.use(cors());


//DB setup

mongoose.connect('mongodb://localhost:auth/auth');

// app setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

//server setup

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('server is start on:', port);