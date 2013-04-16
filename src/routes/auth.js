
var soy = require('../soynode.js');
var isProduction = process.env.NODE_ENV === 'production';

SECRET = require('secret-strings').NU_MINOR;

var OAuth  = require('oauth').OAuth;
var oa = new OAuth(
    "https://twitter.com/oauth/request_token",
    "https://twitter.com/oauth/access_token", 
    SECRET.CONSUMER_KEY,
    SECRET.CONSUMER_SECRET,
    "1.0",
    "http://nu-minor.com/auth/callback",
    "HMAC-SHA1");

// /auth
exports.index = function (req, res) {
  if(req.session.oauth && req.session.oauth.access_token) {
    res.end('you look already authorized.');
  } else {
    res.end(soy.render('app.soy.auth.index', {
      isProduction: isProduction
    }));
  }
};

exports.auth = function(req, res){
  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if (error) {
      res.send("yeah no. didn't work.")
    } else {
      req.session.oauth = {};
      req.session.oauth.token = oauth_token;
      req.session.oauth.token_secret = oauth_token_secret;
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
    }
  });
};

exports.callback = function(req, res, next){
  if (req.session.oauth) {
    req.session.oauth.verifier = req.query.oauth_verifier;
    var oauth = req.session.oauth;
    oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier, 
        function(error, oauth_access_token, oauth_access_token_secret, results){
          if (error){
            res.send("yeah something broke.");
          } else {
            req.session.oauth.access_token = oauth_access_token;
            req.session.oauth.access_token_secret = oauth_access_token_secret;
            req.session.twitter = results;
            res.redirect("/");
          }
        }
    );
  } else
    next(new Error("you're not supposed to be here."));
};

// exports.post = function (req, res) {
//   if(req.session.oauth && req.session.oauth.access_token) {
//     var text = req.body.text;
//     oa.post(
//       'https://api.twitter.com/1/statuses/update.json',
//       req.session.oauth.access_token, 
//       req.session.oauth.access_token_secret,
//       {"status": text},
//       function (err, data, response) {
//         if (err) {
//           res.send('too bad.' + JSON.stringify(err));
//         } else {
//           res.send('posted successfully...!');
//         }
//       });
//   } else {
//     res.send('fail.');
//   }
// };

exports.requireAuthMW = function(req, res, next){
  if (req.session.oauth &&
      req.session.oauth.access_token &&
      req.session.twitter &&
      req.session.twitter.user_id) {
    next();
    return;
  }
  res.status(401);
  res.end(JSON.stringify({
    error: 1,
    reason: 'require auth'
  }));
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.end(soy.render('app.soy.auth.logout', {
    isProduction: isProduction
  }));
};
