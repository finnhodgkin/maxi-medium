const bcrypt = require('bcrypt');
const auth = require('./../database/auth');
const joi = require('joi');
const validateLoginRegister = require('./../helper_functions/validate_login_register');
const handleLoginError = require('./../helper_functions/handle_login_error');

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
      if (err) {
        return reply.view('index', { loginError: err.message, authPrompt: true });
      }
      const { avatar_url } = user;

      bcrypt.compare(password, user.password, (err, isAuthenticated) => {
        if (err) { return reply.view('index', { loginError: 'Error checking your password', authPrompt: true }); }
        if (!isAuthenticated) { return reply.view('index', { loginError: 'Incorrect password', authPrompt: true }); }

        req.cookieAuth.set({username, avatar_url});
        return reply.redirect('/');
      });

    });
  },
};
