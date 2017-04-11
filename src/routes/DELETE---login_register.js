module.exports = {
  method: 'GET',
  path: '/login-register',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    reply.view('login_register');
  },
};
