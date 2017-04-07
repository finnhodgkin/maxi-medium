const connect = require('./db_connect');

const hashPassword = require('./../helper_functions/hash_password');

const post = {};

post.registerUser = ({username, password, avatar_url}, callback) => {

  const userCredentials = 'SELECT username FROM users WHERE username = $1;';
  connect.query(userCredentials, [username], (err, user) => {
    if (err) { return callback(err); }

    if (!user.rows[0]) {
      const addUserQuery = `
      INSERT INTO users (username, password, avatar_url)
      VALUES($1, $2, $3);`;

      hashPassword(password, (err, hash) => {
        if (err) { return callback(err); }

        connect.query(addUserQuery, [username, hash, avatar_url], (err) => {
          if (err) { return callback(err); }
          callback(null, 'New user added');
        });

      });

    } else {
      callback(new Error('Sorry that username is taken!'));

    }
  });
};


post.articles = (newArticle, callback) => {

  connect.query(`INSERT INTO articles (author_id, title, body_text, image_url)
                 VALUES ((SELECT users.id FROM users WHERE users.username = $1), $2, $3, $4)
                 RETURNING id`, [newArticle.username, newArticle.title, newArticle.body_text, newArticle.image_url ], (err, res) => {

                   if (err) return callback(err);

                   callback(null, res);
                 });
};


module.exports = post;
