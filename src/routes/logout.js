module.exports = {
  method: 'GET',
  path: '/logout',
  handler: (req, reply) => {
    req.cookieAuth.clear();
    reply.redirect('/');
  },
};
