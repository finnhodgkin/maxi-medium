module.exports = {
  method: 'GET',
  path: '/login-register',
  handler: (req, reply) => {
    reply.view('login_register');
  },
};
