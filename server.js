const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname+ '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});
app.use(express.static(__dirname+'/public'));
// middleware
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log+'\n', function (err) {
   if (err)
   console.log('Unable to append to server to log');
  });
  next();
});
app.get('/about',(req,res)=>{
 //res.send('About page');
  res.render('about.hbs',{
    pageTitle:'About Page',

  });
});
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',

  });
});
app.get('/bad',(req,res)=>{
  res.send({
   errorMessage:'Unable to handle '
 });
});
app.listen(3000);
