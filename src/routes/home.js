const get = require('./../database/get');

module.exports = {
  method: 'GET',
  path: '/',
  config: {
    auth: { mode: 'try' },
  },
  handler: (req, reply) => {
    get.articles((dbErr, articles) => {
      if (dbErr) { return reply.view('index', {error: dbErr}); }

      reply.view('index', {articles: articles});
    });
  },
};
