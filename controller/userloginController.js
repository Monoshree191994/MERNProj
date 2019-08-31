const express = require('express');
var router = express.Router();
var mailservice = require('./sendMailController');
var {userModel}=require('../model/userModel');

/*********************************************** User Registration ****************************************************************/
router.post('/',(req,res)=>{
   
    var user=new userModel({
        userId:req.body.userId,
        fname:req.body.fname,
        lname:req.body.lname,
        mobile:req.body.mobile,
        email:req.body.email,
        address:req.body.address, 
        occupation:req.body.occupation,
        password:req.body.password
    });
    user.save((err,insertrecord)=>
                            {
                                if(!err)
                                {
                                    //res.send('Document inserted in database..'+ '<br>'+ insertrecord);
                                   
                                    //res.status()
                                    if(res.statusCode==200){
                                        res.send('Successfully entered')
                                    }
                                    if(res.statusCode==404){
                                        res.send('Server Error')
                                    }
                                }
                                else{
                                    console.log('Error in Insertion  '+JSON.stringify(err,undefined,2));
                                }
                            });
})

/*********************************************** User Login *************************************************************** */

router.post('/login', (req, res) => 
                 {
                   console.log(req.body);

                    userModel.find({"email" : req.body.email,"password" : req.body.password},
                                     // CALLBACK function for find method using lambda 
                                        (err, getsearchdocument) => 
                                        {
                                          if (!err) 
                                          { //Check Document find or not using document length
                                            if(getsearchdocument.length >0)  {
                                               res.send(getsearchdocument); 
                                               console.log('MATCHED'); 
                                            }
                                            else
                                               console.log('NOT MATCHED'); 
                                          }
                                          else 
                                          { 
                                            console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); 
                                          }
                                         });
                      });

/****************************************** Forger Password *********************************/

router.post('/forgt',(req,res)=>{

  console.log(req.body)
  userModel.find({"email":req.body.email},
      (err,result)=>{
          if(!err){
              if(result.length>0){
                  var jsonobject = result[0];
                   var newjsonobject = JSON.parse(JSON.stringify(jsonobject));
                   r = "http://localhost:3000/usersetpass";
                   j="Click on the link to reset password"
                  mailservice.sendmail(req.body.email,'Password Reset Link',j,r);

                  newjsonobject["link"] = r;//retived by emploginput
                  console.log(newjsonobject);
                       res.send(newjsonobject); 
              }
              else{
                  console.log("userId not matched")
                  res.json('UserId Not Exist'); 
              }
          }
          else{
              console.log('Error in Retriving Data from admin :' + JSON.stringify(err, undefined, 2)); 
          }
      }
  )
})

/********************************************* SETPASS WORD ************************************/

router.post('/setpass',(req,res)=>{

  console.log(req.body)
  userModel.find({"email":req.body.email},
      (err,result)=>{
          if(!err){
              if(result.length>0){
                userModel.findOneAndUpdate({"email":req.body.email},{"email":req.body.email,"password":req.body.password},
                      (err1,result1)=>{
                          if(!err1)
                              res.send(result1)
                      }
                  )
                  console.log("replaced")
                  res.json('replaced');
              }
              else{
                  console.log("userId not matched")
                  res.json('UserId Not Exist');
              }
          }
          else{
                console.log('Error in Retriving Data from user:' + JSON.stringify(err, undefined, 2)); 
          }
      }
  )
})

module.exports = router;