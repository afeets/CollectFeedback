const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// fetch from mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

// add strategy, requires client ID, and client secret
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        /*
        console.log('access token',accessToken);
        console.log('refresh token',refreshToken);
        console.log('profile',profile);
        */

        // query User Collection to find if user already exists, refactored, return if found
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser){
            return done(null, existingUser);
        }
        
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
    })
);

