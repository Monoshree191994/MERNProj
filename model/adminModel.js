const mongoose= require('mongoose');

var adminModel=mongoose.model('adminModel',
{
    Fname:{type:String},
    Lname:{type:String}, 
    Email:{type:String},
    Password:{type:String},
    
});
module.exports={adminModel};