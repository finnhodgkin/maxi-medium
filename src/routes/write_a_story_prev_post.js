const marked = require('marked');

module.exports = {
  method: 'POST',
  path: '/write-a-story-preview',
  handler: (req, reply) => {
    const strippedText = req.payload.body_text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    marked(strippedText, (err, markdown) => {
      req.payload.body_text = markdown;

      reply(req.payload);
    });
  }
};
