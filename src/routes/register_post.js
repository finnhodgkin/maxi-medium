const post = require('./../database/post');

module.exports = {
  method: 'POST',
  path: '/register',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    const newUser = {
      username: req.payload.username,
      first_name: req.payload.first_name,
      last_name: req.payload.last_name,
      avatar_url: req.payload.avatar_url,
      password: req.payload.password,
    };

    post.registerUser(newUser, (err) => {
      if (err) { return reply.view('index', {error: err}); }

      req.cookieAuth.set({
        username: newUser.username,
        first_name: newUser.first_name,
        avatar_url: newUser.avatar_url,
      });
      reply.redirect('/');
    });

  },
};
