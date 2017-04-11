const marked = require('marked');

module.exports = {
  method: 'POST',
  path: '/write-a-story-preview',
  handler: (req, reply) => {
    marked(req.payload.body_text, (err, markdown) => {
      req.payload.body_text = markdown;

      reply(req.payload);
    });
  }
};
