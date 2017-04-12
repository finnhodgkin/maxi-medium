const post = require('./../database/post');
const marked = require('marked');

module.exports = {
  method: 'POST',
  path: '/write-a-story',
  handler: (req, reply) => {

    const newArticle = Object.assign({}, req.payload, {
      username: req.auth.credentials.username,
      date_posted: Date.now()
    });

    const strippedText = req.payload.body_text.replace(/<|>/g, match => match === '<' ? '&lt;' : '&gt;');
    marked(strippedText, (err, content) => {
      newArticle.body_text = content;

      post.articles(newArticle, (dbErr) => {
        if (dbErr) {
          return reply.view('write_a_story', {error: dbErr});
        }
        reply.redirect('/');
      });
    });

  },
};
