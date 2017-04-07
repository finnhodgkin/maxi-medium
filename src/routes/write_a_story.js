const get = require('./../database/get');


module.exports = {
  method: 'GET',
  path: '/write-a-story',
  handler: (req, reply) => {
    reply.view('write-a-story');
  }
};
