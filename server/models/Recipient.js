const mongoose = require('mongoose');

// destructured same as const Schema = mongoose.Schema;
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});


module.exports = recipientSchema;