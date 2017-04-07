const post = require('./../database/post');

module.exports = {
  method: 'POST',
  path: '/write-a-story',
  handler: (req, reply) => {

    // use object keys instead of below
    const newArticle = req.payload;
    newArticle.username = req.auth.credentials.username;
    newArticle.date = Date.now();

    post.articles(newArticle, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      reply.redirect('/');
    });
  }
};
