const post = require('./../database/post');

module.exports = {
  method: 'POST',
  path: '/submit',
  handler: (req, reply) => {
    // this is what's breaking conole the req.payload to the terminal
    // post.articles((err, payload) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    console.log(req.payload);
    reply('new_article');
    // })
  }
}
