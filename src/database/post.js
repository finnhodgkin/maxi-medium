const connect = require('./db_connect');

const post = {};

post.articles = (err, object) => {
  if (err) return err;
  connect.query(`INSERT INTO articles (title, body_text, image_url)
                 VALUES ( '${object.title}', ${object.body_text}, '${object.image_url}')`);
}

module.exports = post;
