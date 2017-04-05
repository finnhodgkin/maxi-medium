const server = require('../src/server.js');
const tape = require('tape');

tape('Testing the test', (t) => {
  t.equal(1, 1, 'Should be 1');
  t.end();
});

tape('check the route with invalid url', (t) => {
  var options = {
    url: '/nothing',
    method: 'GET',
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 404, 'Incorrect url should return 404');
    t.end();
  });
});
