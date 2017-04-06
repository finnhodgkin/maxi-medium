const post = require('./../database/post');

module.exports = {
  method: 'POST',
  path: '/submit',
  handler: (req, reply) => {

    post.articles(req.payload, (err, id) => {
      if (err) {
        console.log(err);
        return;
      }
      reply.redirect('/');
    })
  }
}
