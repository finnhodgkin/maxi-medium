const hapi = require('hapi');
const server = new hapi.Server();

const inert = require('inert');
const vision = require('vision');

const routes = require('./routes');
const handlebars = require('./handlebars');

server.connection({
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || 4000,
});

console.log(process.env.HOSTNAME || 'localhost');
server.register([inert, vision], err => {
  if (err) throw err;
  server.views(handlebars);
  server.route(routes);
});

module.exports = server;
