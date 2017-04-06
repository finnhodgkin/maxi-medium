const post = require('./../database/post');

module.exports = {
  method: 'POST',
  path: '/register',
  handler: (req, reply) => {
    const newUser = {
      username: req.payload.username,
      password: req.payload.password,
      avatar_url: req.payload.avatar_url,
    };

    post.registerUser(newUser, (err) => {
      if (err) { return reply.view('login_register'); }

      const username = newUser.username;
      const avatar = newUser.avatar_url;

      req.cookieAuth.set({ username, avatar });
      reply.redirect('/');
    });

  },
};
