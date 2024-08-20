const express = require('express');
const { API_VERSION } = require('./constants');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(express.static('uploads'));

app.use(cors());

const AuthRoutes = require('./router/auth.router');
const userRoutes = require('./router/user.router');

app.use(`/api/${API_VERSION}`, AuthRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);


module.exports = app;