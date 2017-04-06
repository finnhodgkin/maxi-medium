module.exports = {
  method: 'POST',
  path: '/submit',
  handler: (req, reply) => {
    console.log(req.payload);
    reply('hi');
  }
}
