const connect = require('./db_connect');

function post(err, object) {
  if (err) return err;
  connect.query(`INSERT INTO articles (author_id, title, body_text, image_url) VALUES ('${}', '${object.title}', ${object.body_text}, '${object.image_url}')`);
}
