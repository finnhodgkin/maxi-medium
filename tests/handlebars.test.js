const tape = require('tape');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// register handlebars helper
require('./../src/views/helpers/format_date');


tape('handlebars - formatDate helper', (t) => {
  const partial = fs.readFileSync(path.join(__dirname, './../src/views/partials/home_main.hbs'), 'utf8');
  const template = handlebars.compile(partial);

  const context = {
    articles: [
      {date_posted: '1'},
    ]
  };

  const html = template(context);
  t.ok(html.indexOf('Jan 1, 1970') !== -1, 'should render formatted date');
  t.end();
});


tape('handlebars - render display name of authors of all stories', (t) => {
  const partial = fs.readFileSync(path.join(__dirname, './../src/views/partials/home_main.hbs'), 'utf8');
  const template = handlebars.compile(partial);

  const context = {
    articles: [
      {first_name: 'Finn', last_name: 'Hodgkin'},
      {first_name: 'Piotr', last_name: 'Berebecki'},
    ]
  };

  const html = template(context);
  t.ok(html.indexOf('Finn Hodgkin') !== -1, 'should render Finn Hodgkin');
  t.ok(html.indexOf('Piotr Berebecki') !== -1, 'should render Piotr Berebecki');
  t.end();
});
