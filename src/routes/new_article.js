const get = require('./../database/get');

module.exports = {
  method: 'GET',
  path: '/submitpost',
  handler: (req, reply) => {

    reply.view('new_article');
  }
};
