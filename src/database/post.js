const connect = require('./db_connect');
const hashPassword = require('./../helper_functions/hash_password');


const post = {};


post.registerUser = ({github_id = null, username, display_name, avatar_url, password = null}, callback) => {

  const selectUserQuery = 'SELECT username FROM users WHERE username = $1;';
  connect.query(selectUserQuery, [username], (err, user) => {
    if (err) { return callback('Database error'); }

    if (!user.rows[0]) {
      const addUserQuery = `
        INSERT INTO users (github_id, username, display_name, avatar_url, password)
        VALUES($1, $2, $3, $4, $5);
      `;

      hashPassword(password, (err, hash) => {
        if (err) { return callback('Sorry, but we have not been able to set up your account'); }

        const userInfo = [github_id, username, display_name, avatar_url, hash];

        connect.query(addUserQuery, userInfo, (err) => {
          if (err) { return callback('Database error during saving details'); }
          callback(null, 'New user added');
        });

      });

    } else {
      callback('Sorry that username is taken!');
    }
  });
};



post.articles = (newArticle, callback) => {
  const newArticleQuery = `
    INSERT INTO articles (author_id, title, body_text, image_url, date_posted)
    VALUES ((SELECT users.id FROM users WHERE users.username = $1), $2, $3, $4, $5)
    RETURNING id;
  `;

  connect.query(newArticleQuery, [newArticle.username, newArticle.title, newArticle.body_text, newArticle.image_url, newArticle.date_posted ], (err, res) => {
    if (err) { return callback('Sorry, but we weren\'t able to save your article'); }

    callback(null, res);
  });
};


module.exports = post;
