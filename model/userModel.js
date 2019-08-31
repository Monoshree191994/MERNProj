// IMPORT MONGOOSE 
const mongoose = require('mongoose');
var userModel = mongoose.model('userModel', 
{
    userId: {type: String},
    fname: { type: String },
    lname: { type: String },
    mobile: { type: Number },
    email: { type: String },
    address: { type: String },
    occupation:{ type: String },
    password:{type:String},
});

module.exports = {userModel} ;