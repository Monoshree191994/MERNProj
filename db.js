
// STEP-1 : IMPORT MONGOOSE PACKAGE
const mongoose1 = require('mongoose');

// Database Connection URL
var url = 'mongodb://localhost:27017/zemy1';


mongoose1.connect(url,{ useNewUrlParser: true }, 
    (err) => 
    {
       if (!err)
          console.log('NODEJS TO MongoDB Connection ESTABLISH.....');
       else
          console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
    });

// STEP-3 : EXPORT MODULE mongoose because we need it in other JS file
module.exports = mongoose1;