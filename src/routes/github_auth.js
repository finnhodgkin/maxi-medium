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
    const queryParamsAccessToken = {
      code: req.url.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    };

    const accessTokenUrl = `https://github.com/login/oauth/access_token?${qs.stringify(queryParamsAccessToken)}`;


    request.post(accessTokenUrl, (err, response, githubAccessTokenResponse) => {
      if (err) { return console.log(err); }
      //@TODO add error handling for no access token
      const { access_token } = qs.parse(githubAccessTokenResponse);

      const requestUserOptions = {
        url: 'https://api.github.com/user',
        headers: {
          'User-Agent': 'maxi-medium',
          Authorization: `token ${access_token}`
        }
      };

      request.get(requestUserOptions, (err, response, githubUserResponse) => {
        if (err) { return console.log(err); }

        const userInfo = JSON.parse(githubUserResponse);
        console.log(userInfo);
        //@TODO DESTRUCTURE GITHUB-USER-RESPONSE --> USER
        // const user = {
        //
        // };
      });

    });





    // get user info


    // add/update user info in db


    // create jwt


    // save cookie


    // redirect to home

  }
};
