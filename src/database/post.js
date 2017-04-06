const connect = require('./db_connect');

const post = {};

post.registerUser = ({username, password, avatar_url}, callback) => {
  const addUserQuery = `
    INSERT INTO users (username, password, avatar_url)
    VALUES($1, $2, $3);
  `;


  connect.query(addUserQuery, [username, password, avatar_url], (err) => {
    if (err) {
      return callback(err);
    }

    callback(null, 'New user added');
  });
};

module.exports = post;
