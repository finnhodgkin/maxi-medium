const connect = require('./db_connect');

const auth = (id, callback) => {
  const userCredentials = 'SELECT username, password, avatar_url FROM users WHERE id = $1';
  connect.query(userCredentials, [id], (err, user) => {
    if (err) return callback(err);

    callback(null, user);
  });
};

module.exports = auth;
