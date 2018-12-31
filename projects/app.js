
const express = require('express');
const app = express();
const port=3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');

let e=mongoose.connect('mongodb://localhost/student',{ useNewUrlParser:true });
let db=mongoose.connection;
let collections = ['details'];


//let dbs = require('mongoose').connect(e, collections);

//let abc = e.details.find();


db.once('open',function()
{
console.log('Connected to mongodb');
});

db.on('error',function(err)
{
	console.log(err);
});

let Article = require('./models/article')

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.get('/',function(req,res)
{
	Article.find({},function(err,details){
	      if(err)
	      {
	      	console.log(err);
	      }	
	      else
	      {
          res.render('index',{
          title:'student',
          details:details
          });
	      }
	});

	});
// add details to form
app.get('/reg',function(req,res){
    res.render('reg',
    {
       title:'Registration page'
    });
  
});
app.post('/reg',function(req,res){
   let article = new Article();
    article.Rollno = req.body.rollno;
    article.Name = req.body.Name;
    article.Date = req.body.date;

    article.save(function(err)
    {
    	if(err)
    	{
         console.log(err);
         return; 		
    	}
    	else
    	{
    		res.redirect('/');
    	}
    });

});
app.listen(port,function()
{
console.log('server start at port 3000....')	
});