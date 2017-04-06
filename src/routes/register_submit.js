const bcrypt = require('bcrypt');

const post = require('./../database/post');
const auth = require('./../database/auth');

module.exports = {
  method: 'POST',
  path: '/register',
  handler: (req, reply) => {
    const newUser = {
      username: req.payload.username,
      password: req.payload.password,
      avatar_url: req.payload.avatar_url,
    };

    post.registerUser(newUser, (err, res) => {
      console.log('=====', err);
      console.log('=====', res);
      reply.redirect('/');
    });

    // const username = req.payload.username;
    // const password = req.payload.password;
    //
    // auth(username, (err, user) => {
    //   if (err) { return reply.view('login'); }
    //   const avatar = user.avatar_url;
    //
    //   bcrypt.compare(password, user.password, (err, isAuthenticated) => {
    //     if (err) { return reply.view('login', {isAuthenticated: false}); }
    //
    //     if (isAuthenticated) {
    //       req.cookieAuth.set({username, avatar});
    //       reply.redirect('/');
    //     } else {
    //       reply.view('login');
    //     }
    //   });
    // });

  },
};
