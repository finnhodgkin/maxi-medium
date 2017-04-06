const auth = require('./../database/auth');

module.exports = {
  method: 'POST',
  path: '/login',
  handler: (req, reply) => {
    const username = req.payload.username;
    const password = req.payload.password;

    const data = {username, password};
    reply.view('test', data);
  },
};
