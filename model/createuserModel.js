// IMPORT MONGOOSE 
const mongoose = require('mongoose');
var createUser = mongoose.model('createUserModel', 
{
    fname: {type: String},
    lname: { type: String },
    userType: { type: String },
    pMobileNo: { type: Number },
    sMobileNo: { type: Number },
    address:{type:String}, 
    email:{type:String},
    pass:{type:String},
    uid:{type:String},
    roleType:{type:String}
});

module.exports = {createUser} ;