const post = require('./../database/post');

module.exports = {
  method: 'POST',
  path: '/write-a-story',
  handler: (req, reply) => {

    post.articles(req.payload, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      reply.redirect('/');
    })
  }
}
