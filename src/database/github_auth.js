const connect = require('./db_connect');

const auth = (github_id, callback) => {
  const userCredentials = `
    SELECT username, github_id, display_name, avatar_url
    FROM users WHERE github_id = $1;`;
  connect.query(userCredentials, [github_id], (err, user) => {
    if (err) { return callback(new Error('Database error, sorry')); }
    callback(null, user.rows[0]);
  });
};

module.exports = auth;
