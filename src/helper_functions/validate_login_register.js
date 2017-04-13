const get = require('./../database/get');

module.exports = function (request, reply, source, err) {
  get.articles((dbErr, articles) => {
    if (dbErr) { return reply.view('index', {error: dbErr}); }

    // distinguish different inputs with the same html name by adding request path
    const path = request.url.pathname.slice(1);

    const errorField = err.message.slice(
      err.message.indexOf('"') + 1,
      err.message.indexOf('"', 7)
    ) + '_' + path + 'Error';

    const message = err.message
      .slice(err.message.indexOf('[') + 1, -1)
      .replace(/"/g, '')
      .replace(/_/g, ' ')
      .replace(/[a-z]/i, char => char.toUpperCase());

    return reply.view('index', { articles: articles, [errorField]: message, authPrompt: true, ['form_' + path]: request.payload });
  });
};
