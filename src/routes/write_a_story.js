module.exports = {
  method: 'GET',
  path: '/write-a-story',
  handler: (req, reply) => {
    reply.view('write_a_story');
  },
};
