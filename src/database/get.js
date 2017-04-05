const connect = require('./db_connect');

const get = {};

get.articles = (callback) => {
  connect.query('SELECT * FROM articles', (err, response) => {
    if (err) return callback(err);

    callback(null, response.rows);
  });
};

module.exports = get;
