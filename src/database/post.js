const connect = require('./db_connect');

const post = {};

post.articles = (newArticle, callback) => {
  connect.query(`INSERT INTO articles (author_id, title, body_text, image_url)
                 VALUES (1, '${newArticle.title}', '${newArticle.body_text}', '${newArticle.image_url}') RETURNING id`, (err, res) => {

                   if (err) return callback(err);

                   callback(null, res)
                 });
}

module.exports = post;
