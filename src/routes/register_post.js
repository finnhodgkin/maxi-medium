const post = require('./../database/post');
const joi = require('joi');
const validateLoginRegister = require('./../helper_functions/validate_login_register');

module.exports = {
  method: 'POST',
  path: '/register',
  config: {
    auth: { mode: 'try' },
    validate: {
      payload: joi.object({
        username: joi.string().min(2).max(64).required(),
        display_name: joi.string().min(2).max(64).required(),
        avatar_url: joi.string().max(500).required(),
        password: joi.string().min(6).max(64).required(),
        confirmed_password: joi.any().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
      }),
      failAction: validateLoginRegister,
    }
  },
  handler: (req, reply) => {
    const newUser = {
      username: req.payload.username,
      display_name: req.payload.display_name,
      avatar_url: req.payload.avatar_url,
      password: req.payload.password,
    };

    post.registerUser(newUser, (err) => {
      if (err) { return reply.view('index', {error: err.message}); }

      req.cookieAuth.set({
        username: newUser.username,
        display_name: newUser.display_name,
        avatar_url: newUser.avatar_url,
      });
      reply.redirect('/');
    });

  },
};
