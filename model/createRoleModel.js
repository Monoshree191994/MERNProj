const mongoose = require('mongoose');
var createRole = mongoose.model('createRole', 
{
   roleId:{type:String},
   roleType:{type:String},
    AccessModule:{type:String}
    
});

module.exports = {createRole} ;