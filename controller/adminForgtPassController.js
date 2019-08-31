const express = require('express');
var router = express.Router();
var mailservice = require('./sendMailController');
var {adminModel}=require('../model/adminModel');

router.post('/forgt',(req,res)=>{
    console.log(req.body)
    adminModel.find({"Email":req.body.Email},
        (err,result)=>{
            if(!err){
                if(result.length>0){
                    var jsonobject = result[0];
                     var newjsonobject = JSON.parse(JSON.stringify(jsonobject));
                     r = "http://localhost:3000/setPass";
                     j="Click on the link to reset password"
                    mailservice.sendmail(req.body.Email,'YOUR OTP',j,r);

                    newjsonobject["link"] = r;//retived by emploginput
                                               console.log(newjsonobject);
											   
											   //res.send(r.toString()); 
											   res.send(newjsonobject); 

                    /*adminModel.findOneAndUpdate({"Email":req.body.Email},{"Email":req.body.Email,"Password":req.body.Password},
                        (err1,result1)=>{
                            if(!err1)
                                res.send(result1)
                        }
                    )*/
                    //console.log("replaced")
                    
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

router.post('/setpass',(req,res)=>{
    console.log(req.body)
    adminModel.find({"Email":req.body.Email},
        (err,result)=>{
            if(!err){
                if(result.length>0){
                    adminModel.findOneAndUpdate({"Email":req.body.Email},{"Email":req.body.Email,"Password":req.body.Password},
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
                console.log('Error in Retriving Data from admin :' + JSON.stringify(err, undefined, 2)); 
            }
        }
    )
})


module.exports = router;
