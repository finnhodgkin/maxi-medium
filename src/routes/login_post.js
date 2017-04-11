const bcrypt = require('bcrypt');

const auth = require('./../database/auth');

module.exports = {
  method: 'POST',
  path: '/login',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    const username = req.payload.username;
    const password = req.payload.password;

    auth(username, (err, user) => {
      if (err) { return reply.view('login_register'); }
      const avatar = user.avatar_url;

      bcrypt.compare(password, user.password, (err, isAuthenticated) => {
        if (err) { return reply.view('login_register', {isAuthenticated: false}); }

        if (isAuthenticated) {
          req.cookieAuth.set({username, avatar});
          reply.redirect('/');
        }
      });

    });
  },
};
