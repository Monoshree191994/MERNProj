const express = require('express');
var router = express.Router();
var {adminModel}=require('../model/adminModel');
var {createUser}=require('../model/createuserModel');
var {createRole}=require('../model/createRoleModel');
 /*router.get('/', (req, res) => 
                {
                    adminModel.find((err, getalldocumentsfrommongodb) => 
                  {
                    if (!err) 
                    { 
                       res.send(getalldocumentsfrommongodb); 
                    }
                    else 
                    { 
                       console.log('Error in Retriving Admin :' + JSON.stringify(err, undefined, 2)); 
                    }
                  });
                });

               router.post('/',(req,res)=>
                    {
                        var can=new adminModel({
                            
                            Fname:req.body.Fname,
                            Lname:req.body.Lname,
                            Email:req.body.Email,
                            Password:req.body.Password
                            
                        });
    
                        can.save((err,insertrecord)=>
                            {
                                if(!err)
                                {
                                    res.send('Document inserted in database..'+ '<br>'+ insertrecord);
                                }
                                else{
                                    console.log('Error in Insertion  '+JSON.stringify(err,undefined,2));
                                }
                            });
                        
                    });
*/
router.post('/login',(req,res)=>{
    console.log(req.body.Email)
    //console.log(req.req.Email)
    console.log(req.body.Password)
    adminModel.find({"Email":req.body.Email,"Password":req.body.Password},
        
            (err,result)=>{
            //    console.log(Email)
                if(!err)
                {
                    //res.send(req.body.Email)
                    if(result.length>0){
                        res.send(result);
                        console.log(" MATCHED");
                    }
                    
                    else
                        console.log("NOT MATCHED");
                }
                else{
                    console.log('Error in Retriving Admin :' + JSON.stringify(err, undefined, 2)); 
                }
            }
    );
});
/************************************* Create User *********************************************************************/
router.post('/createuser',(req,res)=>
                    {
                        var User=new createUser({
                            
                            fname:req.body.fname,
                            lname:req.body.lname,
                            userType:req.body.userType,
                            pMobileNo:req.body.pMobileNo,
                            sMobileNo:req.body.sMobileNo,
                            address:req.body.address, 
                            email:req.body.email,             
                            pass:req.body.pass,
                            uid:req.body.uid,
                        });
                              
                        User.save((err,insertrecord)=>
                            {
                                if(!err)
                                {
                                    res.send('Document inserted in database..'+ '<br>'+ insertrecord);
                                    //res.json('Inserted');
                                    console.log("Inserted")
                                }
                                else{
                                    console.log('Error in Insertion  '+JSON.stringify(err,undefined,2));
                                }
                            });
                        
                    });

/******************************************************* CREATE ROLE ************************************************************************/  

router.post('/createrole',(req,res)=>
                    {
                        var role=new createRole({
                            
                            roleId:req.body.roleId,
                            roleType:req.body.roleType,
                            AccessModule:req.body.AccessModule
                        });
                              
                        role.save((err,insertrecord)=>
                            {
                                if(!err)
                                {
                                    res.send('Document inserted in database..'+ '<br>'+ insertrecord);
                                    //res.json('Inserted');
                                    console.log("Inserted")
                                }
                                else{
                                    console.log('Error in Insertion  '+JSON.stringify(err,undefined,2));
                                }
                            });
                        
                    });

/******************************************************* VIEW USER ************************************************************************/ 
                    
router.get('/viewuser', (req, res) => 
                {
                    createUser.find((err, getalldocumentsfrommongodb) => 
                  {
                    if (!err) 
                    { 
                       res.send(getalldocumentsfrommongodb); 
                    }
                    else 
                    { 
                       console.log('Error in Retriving users :' + JSON.stringify(err, undefined, 2)); 
                    }
                  });
                });   

 /******************************************************* VIEW ROLES ************************************************************************/ 
 router.get('/viewroles', (req, res) => 
                {
                    createRole.find((err, getalldocumentsfrommongodb) => 
                  {
                    if (!err) 
                    { 
                       res.send(getalldocumentsfrommongodb); 
                    }
                    else 
                    { 
                       console.log('Error in Retriving Roles :' + JSON.stringify(err, undefined, 2)); 
                    }
                  });
                });    
                
/******************************************************* ASSIGN ROLE ************************************************************************/  

router.post('/assignrole',(req,res)=>{
    console.log(req.body)
    createUser.find({"uid":req.body.uid},
        (err,result)=>{
            if(!err){
                if(result.length>0){
                    createUser.findOneAndUpdate({"uid":req.body.uid},{"uid":req.body.uid,"roleType":req.body.roleType},
                        (err1,result1)=>{
                            if(!err1)
                                res.send(result1)
                        }
                    )
                    console.log("replaced")
               
                }
                else{
                    console.log("userId not matched")
                }
            }
            else{
                console.log('Error in Retriving Data from admin :' + JSON.stringify(err, undefined, 2)); 
            }
        }
    )
})


/****************************************************** View Role */

module.exports = router; 