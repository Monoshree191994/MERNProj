const express=require('express');
const bodyParser=require('body-parser');

const {mongoose}=require('./db.js');

var app=express();
var adminLoginController=require('./controller/adminLoginController');
var userloginController=require('./controller/userloginController');
var adminForgtPassController=require('./controller/adminForgtPassController');

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use('/admin',adminLoginController);
app.use('/userreg',userloginController);
app.use('/adminfrgtpass',adminForgtPassController);
app.listen(4000,()=> console.log('Express Server started at port no:  4000'));