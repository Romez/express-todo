module.exports = function (passport, users, md5) {
    var login = function (req, res) {
        res.render('login.hbs',
            {},
            function (err, html) {
                if(err) throw err;
                res.render('layout.hbs', {
                    content: html
                })
            }
        )
    };

    const auth = function (req, res) {
        const LocalStrategy = require('passport-local').Strategy;
        passport.use(new LocalStrategy(
            function (username, password, done) {
                users.view(username, function (err, user) {

                    if (user.length === 1 && user[0].password === md5(password+user[0].salt)) {
                        return done(err, {
                            username: user[0].username,
                            id: user[0].id
                        });
                    } else {
                        return done(err, false, {message: 'Неверный логин ли пароль'});
                    }
                });
            }
        ));

        passport.serializeUser(function (user, done) {
            done(null, user.username);
        });

        passport.deserializeUser(function (id, done) {
            done(null, {username: id})
        });

        return passport.authenticate(
            'local', {
                successRedirect: '/',
                failureRedirect: '/login'
            }
        );
    };

    var logout = function (req, res) {
        req.logout();
        res.redirect('/');
    };

    return {
        'login': login,
        'auth': auth(),
        'logout': logout
    };
};