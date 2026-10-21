const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// import collections
require('./models/User');

require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// make use of cookies
app.use(
    cookieSession({
        maxAge: 7 * 24 * 60 * 60 * 1000, // convert 7 days into milliseconds
        keys: [ keys.cookieKey ]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(5000);

