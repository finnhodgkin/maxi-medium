const handlebars = require('handlebars');

handlebars.registerHelper('formatDate', function(date){
  const uglyDate = new Date(Number(date)).toISOString();
  const year = uglyDate.slice(0, 4);
  const month = uglyDate.slice(5, 7);
  const day = uglyDate.slice(8, 10);
  return `${day}/${month}/${year}`;
});
