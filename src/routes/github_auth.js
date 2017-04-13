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
    const renderError = message => reply.view('index', { error: message });

    // get access token
    const queryParamsAccessToken = {
      code: req.url.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    };

    const accessTokenUrl = `https://github.com/login/oauth/access_token?${qs.stringify(queryParamsAccessToken)}`;

    request.post(accessTokenUrl, (err, response, githubAccessTokenResponse) => {
      if (err) { return renderError('Error connecting to Github.'); }

      const { access_token } = qs.parse(githubAccessTokenResponse);
      if (!access_token) {
        return renderError('Error connecting to your Github account.');
      }

      const requestUserOptions = {
        url: 'https://api.github.com/user',
        headers: {
          'User-Agent': 'maxi-medium',
          Authorization: `token ${access_token}`
        }
      };

      request.get(requestUserOptions, (err, response, githubUserResponse) => {
        if (err) { return renderError('Error fetching Github user details.'); }

        const userInfo = JSON.parse(githubUserResponse);

        const user = {
          github_id: userInfo.id,
          username: userInfo.login,
          display_name: userInfo.name,
          avatar_url: userInfo.avatar_url,
        };

        // Add a DB check to see if Github user exists
        githubAuth(user.github_id, (err, userDb) => {
          if (err) { return console.log(err); }

          if (userDb) {
            const isUserInfoTheSame = Object.keys(userDb)
              .every(key => userDb[key] == user[key]);

            // If the user exists but their information has changed, update details
            if (!isUserInfoTheSame) {
              post.updateUser(user, (err) => {
                if (err) { return console.log(err); }
              });
            }
          } else {
            // If they don't, register a new user
            post.registerUser(user, (err) => {
              if (err) { return console.log(err); }
              // @TODO handle a case of github user changling their username in conflict with
              // an existing user, between sessions
            });
          }

          req.cookieAuth.set({ username: user.username, avatar_url: user.avatar_url });
          reply.redirect('/');
        });
      });
    });
  }
};
