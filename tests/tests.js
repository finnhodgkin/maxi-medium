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

tape('check the home route', (t) => {
  var options = {
    url: '/',
    method: 'GET',
  };
  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'correct home route should return 200');
    t.end();
  });
});

// // tape('check the submit route', (t) => {
// //   var options = {
// //     url: '/submit',
// //     method: 'POST',
// //   };
// //   server.inject(options, (res) => {
// //     t.equal(res.statusCode, 200, 'correct home route should return 200');
// //     t.end();
// //   });
// // });
//
//
// tape('check the submitpost route', (t) => {
//   var options = {
//     url: '/submitpost',
//     method: 'GET',
//   };
//   server.inject(options, (res) => {
//     t.equal(res.statusCode, 200, 'correct submitpost route should return 200');
//     t.end();
//   });
// });
