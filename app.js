var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var storage = [];
var app = express();
app.set("port", process.env.PORT || 3000);

// Use the session middleware
app.use(session({
                   secret:'oneir cloud', 
                   cookie: { maxAge : 600000000 },
                   resave: true,
                   saveUninitialized: true
                }));
 

var routes = require('./routes/index');
var users = require('./routes/users');
var inventory = require('./routes/inventory');
var api = require('./routes/api');
var menu = require('./routes/menu');
var login_check = require('./routes/login_check');
var oneir_session_login = require('./routes/oneir_session_login');
var login_check = require('./routes/login_check');
var oneir_logout = require('./routes/oneir_logout');
var oneir_commands = require('./routes/oneir_commands');
var oneir = require('./routes/oneir');
var oneir_session_name = require('./routes/oneir_session_name');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//app.set("view engine","ejs");


app.use('/', routes);
app.use('/users', users);
app.use('/inventory', inventory);
app.use('/api', api);

app.get("/menu",function(req,res){
            res.render("menu");
      });

app.get("/login_check",function(req,res){
           if(req.session.idx) res.json({'id' : 1});
           else                res.json({'id' : 0});
           res.end();
      });

app.get("/oneir_session_login",function(req,res){
             if(req.query.id)
             { 
               req.session.idx = req.query.id;
               res.json({'id' : 1});
             }
             res.end();
      });

app.get("/oneir_logout",function(req,res){
           req.session.idx = null;
           req.session.destroy(function(err) {});
           res.end();
        });
       
app.get("/oneir_commands",function(req,res){
           //if(req.query.q && req.session.idx) 
              storage[req.session.idx] = req.query.q;  
              res.end();    
        });

app.get("/oneir",function(req,res){
           var temp = 0;
           if(req.query.q != null && storage[req.query.q] != null)
           { 
              temp = storage[req.query.q];
              storage[req.query.q] = null;
           }
            res.header('Content-Lenght', temp);         
           res.status(200).json({'command' : temp});
           res.end();
        });

app.get("/oneir_session_name",function(req,res){
           if(req.session.idx !== null) 
           res.json({ 'id' : req.session.idx});
           res.end();
        });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/* initializing rethinkdb*/


module.exports = app;


