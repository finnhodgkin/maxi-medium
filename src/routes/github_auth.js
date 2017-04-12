const request = require('request');
const qs = require('querystring');


module.exports = {
  method: 'GET',
  path: '/github-auth',
  config: {
    auth: false
  },
  handler: (req, reply) => {

    // get access token
    const queryParams = {
      code: req.url.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    };

    const requestOptions = {
      method: 'POST',
      url: `https://github.com/login/oauth/access_token?${qs.stringify(queryParams)}`
    };

    request(requestOptions, (err, response, githubResponseBody) => {
      if (err) { return console.log(err); }

      const { access_token } = qs.parse(githubResponseBody);
      reply(access_token);
    });





    // get user info


    // add/update user info in db


    // create jwt


    // save cookie


    // redirect to home

  }
};
