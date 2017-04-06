module.exports = {
  method: 'GET',
  path: '/login',
  handler: (req, reply) => {
    reply.view('login');
  },
};
