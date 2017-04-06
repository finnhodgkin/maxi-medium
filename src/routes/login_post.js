const bcrypt = require('bcrypt');

const auth = require('./../database/auth');

module.exports = {
  method: 'POST',
  path: '/login',
  handler: (req, reply) => {
    const username = req.payload.username;
    const password = req.payload.password;

    auth(username, (err, user) => {
      if (err) { return reply.view('login'); }

      bcrypt.compare(password, user.password, (err, isAuthenticated) => {
        if (err) { return reply.view('login', {isAuthenticated: false}); }

        reply.view('test', {username, password, isAuthenticated});
      });
    });

  },
};
