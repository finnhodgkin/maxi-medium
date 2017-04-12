const bcrypt = require('bcrypt');
const auth = require('./../database/auth');
const joi = require('joi');
const validateLoginRegister = require('./../helper_functions/validate_login_register');

module.exports = {
  method: 'POST',
  path: '/login',
  config: {
    auth: { mode: 'try' },
    validate: {
      payload: joi.object({
        password: joi.string().min(6).max(64).required(),
        username: joi.string().min(2).max(64).required(),
      }),
      failAction: validateLoginRegister,
    }
  },
  handler: (req, reply) => {
    const username = req.payload.username;
    const password = req.payload.password;

    auth(username, (err, user) => {
      if (err) { return reply.view('index', {error: err}); }
      const { avatar_url } = user;

      bcrypt.compare(password, user.password, (err, isAuthenticated) => {
        if (err) { return reply.view('index', {error: 'Sorry, we cannot verify your account at the moment'}); }
        if (!isAuthenticated) { return reply.view('index', {error: 'Sorry, wrong password'}); }

        req.cookieAuth.set({username, avatar_url});
        return reply.redirect('/');
      });

    });
  },
};
