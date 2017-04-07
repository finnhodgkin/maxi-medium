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
    t.ok(res.payload.indexOf('DOCTYPE html') !== -1, 'html page should be served');
    t.end();
  });
});


tape('check the home route', (t) => {
  var options = {
    url: '/login-register',
    method: 'GET',
  };
  server.inject(options, (res) => {
    console.log('====== login get stcode', res.statusCode);
    t.equal(res.statusCode, 200, 'correct home route should return 200');
    t.end();
  });
});



// How can we check whether this works?
// tape('check the user login logic', (t) => {
//   var options = {
//     url: '/login',
//     method: 'POST',
//     payload: {username: 'u1', password: 'pwd'}
//   };
//
//
//   server.inject(options, (res) => {
//     console.log('=====');
//     t.ok(true, 'should');
//     t.end();
//   });
// });


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
