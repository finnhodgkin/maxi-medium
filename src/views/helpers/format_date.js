const handlebars = require('handlebars');


handlebars.registerHelper('formatDate', function(date) {
  const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(+date).toLocaleDateString('en-GB', dateOptions);
});
