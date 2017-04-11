const post = require('./../database/post');
const marked = require('marked');

module.exports = {
  method: 'POST',
  path: '/write-a-story',
  handler: (req, reply) => {

    // use object keys instead of below
    const newArticle = req.payload;

    newArticle.username = req.auth.credentials.username;
    newArticle.date = Date.now();

    marked(req.payload.body_text, (err, content) => {
      newArticle.body_text = content;

      post.articles(newArticle, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        reply.redirect('/');
      });

    });

  },
};
