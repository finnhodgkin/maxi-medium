const handlebars = require('handlebars');

module.exports = {
  engines: {
    hbs: handlebars,
  },
  path: 'views',
  layout: 'default',
  relativeTo: __dirname,
  layoutPath: 'views/layouts',
  partialsPath: 'views/partials',
  // helpersPath: 'views/helpers', Removed this for the time being as we don't have any helpers set up right now
};
