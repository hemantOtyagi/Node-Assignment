const mongoose = require('mongoose');
const { Schema } = mongoose;


const adminSchema  = new Schema({
    firstName:{type: String, required: true },
    lastName:{type: String },
    country:{type: String },
    mobileNo:{type: String },
    email:{type: String },
    password:{type: String },
    secreKey:{type: String }
})

module.exports = mongoose.model('Admin', adminSchema);