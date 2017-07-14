module.exports = function (tasks) {
    var index = function (req, res) {
        tasks.list(function (err, tasks) {
            res.render('tasks.hbs',
                {tasks: tasks},
                function (err, html) {
                    if(err) throw err;
                    res.render('layout.hbs', {
                        content: html
                    })
                }
            )
        })
    };
    var add = function (req, res) {
        tasks.add(req.body.task, function () {
            res.redirect('/tasks');
        })
    };
    var del = function (req, res) {
        var id = req.params.id;
        tasks.delete(id, function () {
            res.redirect('/');
        });
    };
    var view = function (req, res) {
        var id = req.params.id;

        tasks.view(id, function (err, task) {
            res.render('task.twig',
                {task: task},
                function (err, html) {
                    if(err) throw err;
                    res.render('layout.hbs', {
                        content: html
                    })
                }
            )
        });
    };

    return {
        index: index,
        add: add,
        del: del,
        view: view
    };
};