var express = require('express');
var app = express();
app.use(express.static(__dirname));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser());

var session = require('cookie-session');
app.use(session({keys: ['secret']}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

var mustBeAuthenticated = function (req, res, next) {
    req.isAuthenticated() ? next() : res.redirect('/login');
};

app.all('/', mustBeAuthenticated);
app.all('/tasks', mustBeAuthenticated);
app.all('/task', mustBeAuthenticated);
app.all('/task/*', mustBeAuthenticated);

var templates = require('consolidate');
app.engine('hbs', templates.handlebars);
app.engine('twig', templates.twig);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(function(req, res, next){
    if(req.user) {
        res.locals.username = req.user.username;
    }
    next();
});

var mysql = require('mysql');
var config = require('./config');
var pool = mysql.createPool(config.db);

var tasksModel = require('./modules/tasks')(pool);
var tasksController = require('./controllers/tasksController')(tasksModel);

app.get('/tasks', tasksController.index);
app.post('/tasks', tasksController.add);
app.get('/task/:id', tasksController.view);
app.get('/task/:id/delete', tasksController.del);

var indexController = require('./controllers/indexController')();
app.get('/', indexController.index);

var md5 = require('md5');
var usersModel = require('./modules/users')(pool);
var authController = require('./controllers/authController')(passport, usersModel, md5);
app.get('/login', authController.login);
app.post('/login', authController.auth);
app.get('/logout', authController.logout);

app.listen(8080);
console.log('server was stared');
