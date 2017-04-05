const handlebars = require('handlebars');

handlebars.registerHelper('shortenBody', function(body) {
  return body.slice(0, 30) + '...';
});
