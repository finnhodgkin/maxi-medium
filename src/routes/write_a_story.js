const get = require('./../database/get');

module.exports = {
  method: 'GET',
  path: '/write-a-story',
  handler: (req, reply) => {
    if (!req.auth.credentials) {
      return reply.view('index', {authPrompt: true});
    }
    reply.view('write-a-story');
  },
};
