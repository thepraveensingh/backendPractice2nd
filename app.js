const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const { log } = require('console');
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
  res.render('index');
})

app.get('/read',async(req,res)=>{
  let users = await userModel.find()
  res.render('read',{users});
})

app.get('/delete/:id',async(req,res)=>{
  let users = await userModel.findOneAndDelete({_id : req.params.id})
  res.redirect('/read');
})

app.get('/edit/:id',async(req,res)=>{
  let user = await userModel.findOne({_id : req.params.id})
  res.render("edit",{user})
})
app.post('/update/:id',async(req,res)=>{
  let {name,email,imageurl}= req.body; 
  let user = await userModel.findOneAndUpdate({_id : req.params.id},{name,email,imageurl},{new:true})
  res.redirect('/read')
})

app.post('/create', async (req,res) =>{
  let {name,email,imageurl}= req.body;  
  let createdUser = await userModel.create({
    name,
    email,
    imageurl
  });
  res.redirect('/read');
})

app.listen(3000,(req,res) => {
  console.log("server is running at 3000");
  
});