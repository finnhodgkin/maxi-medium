const connect = require('./db_connect');
const hashPassword = require('./../helper_functions/hash_password');


const post = {};


post.registerUser = ({github_id = null, username, display_name, avatar_url, password = null}, callback) => {

  const selectUserQuery = 'SELECT username FROM users WHERE username = $1;';
  connect.query(selectUserQuery, [username], (err, user) => {
    if (err) { return callback(new Error('Database error')); }

    if (!user.rows[0]) {
      post.createUser({github_id, username, display_name, avatar_url, password}, callback);

    } else {
      callback(new Error('Sorry that username is taken!'));
    }
  });
};



post.createUser = ({github_id, username, display_name, avatar_url, password}, callback) => {
  const addUserQuery = `
    INSERT INTO users (github_id, username, display_name, avatar_url, password)
    VALUES($1, $2, $3, $4, $5);
  `;

  const queryCallback = (err) => {
    if (err) { return callback(new Error('Database error during saving details')); }
    callback(null, 'New user added');
  };

  // if new user is registering via github
  if (github_id) {
    const userInfo = [github_id, username, display_name, avatar_url, password];
    connect.query(addUserQuery, userInfo, queryCallback);
  } else {
    hashPassword(password, (err, hash) => {
      if (err) { return callback(new Error('Sorry, but we have not been able to set up your account')); }

      const userInfo = [github_id, username, display_name, avatar_url, hash];
      connect.query(addUserQuery, userInfo, queryCallback);
    });
  }
};


post.updateUser = ({github_id, username, display_name, avatar_url}, callback) => {
  const updateUserQuery = `
    UPDATE users
    SET
      username = $2,
      display_name = $3,
      avatar_url = $4
    WHERE
      github_id = $1;
  `;

  const userInfo = [github_id, username, display_name, avatar_url];
  connect.query(updateUserQuery, userInfo, (err) => {
    if (err) { return callback(new Error('Database error while updating details')); }
    
    callback(null, 'User details updated');
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
