module.exports = function (pool) {
    return {
        view: function (username, callback) {
            pool.query('SELECT * FROM users WHERE ?', {username}, callback);
        }
    };
};
