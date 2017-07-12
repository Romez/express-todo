var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    database: 'express-todo',
    user: 'root',
    password: ''
});

var Tasks = {
    list: function (callback) {
        pool.getConnection(function(err, connection){
            connection.query('SELECT * FROM tasks', callback);
            connection.release();
        });
    },

    add: function (task, callback) {
        pool.getConnection(function(err, connection){
            connection.query('INSERT INTO tasks SET ?', {task: task}, callback);
            connection.release();
        });
    },

    change: function (id, text, callback) {
        // TODO
    },

    complete: function (id, callback) {
        //TODO
    },

    delete: function (id, callback) {
        //TODO
    }
};

module.exports = Tasks;
