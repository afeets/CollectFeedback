const e = require("express");

if(process.env.NODE_ENV === 'production'){
    // return prod keys
}
else {
    // return dev keys
    module.exports = require('./dev');
}
