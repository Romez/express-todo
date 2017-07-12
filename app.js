var config = require('./config');

var tasks = require('./modules/tasks');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser());

var templates = require('consolidate');
app.engine('hbs', templates.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

var request = require('request');
var urlutils = require('url');

app.get('/', function (req, res) {
    tasks.list(function (err, tasks) {
        console.log(tasks);

        res.render('tasks.hbs',
            {tasks: tasks},
            function (err, html) {
                if(err) throw err;
                console.log(html);

                res.render('layouts.hbs', {
                    content: html
                })
            }
        )
    })
});

app.post('/', function (req, res) {
    tasks.add(req.body.task, function () {
        res.redirect('/');
    })
});

app.listen(8080);
console.log('server was stared');