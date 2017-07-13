var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var urlutils = require('url');
var templates = require('consolidate');

app.use(bodyParser());
app.use(express.static(__dirname));

app.engine('hbs', templates.handlebars);
app.engine('twig', templates.twig);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

var config = require('./config');
var pool = mysql.createPool(config.db);

var tasks = require('./modules/tasks')(pool);
var tasksController = require('./controllers/tasksController')(tasks);


app.get('/', tasksController.index);
app.get('/tasks', tasksController.index);
app.post('/tasks', tasksController.add);
app.get('/task/:id', tasksController.view);
app.get('/task/:id/delete', tasksController.del);

app.listen(8080);
console.log('server was stared');
