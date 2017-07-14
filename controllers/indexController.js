module.exports = function () {
    var index = function (req, res) {

        console.log(req.user);

        res.render('index/index.hbs',
            function (err, html) {
                if(err) throw err;
                res.render('layout.hbs', {
                    content: html
                })
            }
        )
    };

    return {
        index: index
    };
};