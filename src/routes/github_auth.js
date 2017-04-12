const request = require('request');
const qs = require('querystring');

const post = require('./../database/post');
const githubAuth = require('./../database/github_auth');


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

        //@TODO DESTRUCTURE GITHUB-USER-RESPONSE --> USER
        const user = {
          github_id: userInfo.id,
          username: userInfo.login,
          display_name: userInfo.name,
          avatar_url: userInfo.avatar_url,
        };

        // Add a DB check to see if Github user exists
        // If they don't, register a new user
        // If they do, update details
        // Either way: assign a cookie

        githubAuth(user.github_id, (err, userDb) => {
          if (err) { return console.log(err); }

          if (userDb) {
            const isUserInfoTheSame = Object.keys(userDb).every(key => {
              return userDb[key] == user[key];
            });

            // if (!isUserInfoTheSame) {
            //   post.updateUser(user, (err) => {
            //
            //   });
            // }
          } else { // NO USER
            post.registerUser(user, (err) => {
              if (err) { return console.log(err); }
            });

          }
          req.cookieAuth.set({ username: user.username, avatar_url: user.avatar_url });
          reply.redirect('/');
        });




      });

    });



    // create jwt


    // save cookie


    // redirect to home

  }
};
