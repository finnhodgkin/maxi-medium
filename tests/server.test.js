const server = require('./../src/server.js');
const tape = require('tape');


const routes = [
  {url: '/', method: 'GET', statusCode: 200, payload: 'DOCTYPE html'},
  {url: '/some-bad-url', method: 'GET', statusCode: 404},
  // {url: '/login', method: 'POST', statusCode: 200},
  // {url: '/register', method: 'POST', statusCode: 200},
  {url: '/write-a-story', method: 'GET', statusCode: 302},
  {url: '/write-a-story', method: 'POST', statusCode: 302},
  {url: '/write-a-story-preview', method: 'POST', statusCode: 302},
  {url: '/logout', method: 'GET', statusCode: 302},
  {url: '/css/style.css', method: 'GET', statusCode: 200},
  {url: '/css/style.css', method: 'GET', statusCode: 200},
];


routes.forEach(route => {
  tape(`${route.url} ${route.method} route`, (t) => {
    var options = {
      url: route.url,
      method: route.method,
    };
    server.inject(options, (res) => {
      route.statusCode && t.equal(res.statusCode, route.statusCode, `statusCode should be ${route.statusCode}`);
      route.payload    && t.ok(res.payload.indexOf(route.payload) !== -1, 'correct payload should be served');
      t.end();
    });
  });
});
