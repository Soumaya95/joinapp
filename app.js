/**
 * Created by Soumaya Rebai on 29/03/2017.
 */
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const app=express();
const users=require('./routes/users');
const config=require('./config/database');
// connect to database
mongoose.connect(config.database);
// on connection
mongoose.connection.on('connected',function(){console.log('connected to databse'+config.database);})
// on error
mongoose.connection.on('error',function(err){console.log('Database error:'+err);})
//Port Number
//Port Number

const port=8080;
// CORS middleware
app.use(cors());
// set static folder
app.use(express.static(path.join(__dirname,'public')));
// Body Parser Middleware
app.use(bodyParser.json());
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users',users);
//Index Route
app.get('/',function(req,res){res.send('Invalid Endpoint');
});
app.get('*', function(req,res) { res.sendFile(path.join(__dirname,'public/index.html'))});
//Start Server
app.listen(port, function() { console.log('Sever started on port'+port);});



