

var soy = require('../soynode.js');
var isProduction = process.env.NODE_ENV === 'production';
var Q = require('q');
var db = require('../setupdb');


var SECRET = require('secret-strings').NU_MINOR;
var oa = new (require('oauth').OAuth)(
    'https://twitter.com/oauth/request_token',
    'https://twitter.com/oauth/access_token',
    SECRET.CONSUMER_KEY,
    SECRET.CONSUMER_SECRET,
    '1.0',
    'http://nu-minor.com/auth/callback',
    'HMAC-SHA1');

var getOAuthRequestToken = Q.denodeify(oa.getOAuthRequestToken.bind(oa));
var getOAuthAccessToken = Q.denodeify(oa.getOAuthAccessToken.bind(oa));
var getWithOAuth = Q.denodeify(oa.get.bind(oa));

var findOne = Q.denodeify(db.user.findOne.bind(db.user));
var updateUser = Q.denodeify(db.user.update.bind(db.user));

// /auth
exports.index = function(req, res) {
  if (req.session.oauth && req.session.oauth.access_token) {
    res.end('you look already authorized.');
  } else {
    res.end(soy.render('app.soy.auth.index', {
      isProduction: isProduction
    }));
  }
};

exports.auth = function(req, res) {
  getOAuthRequestToken()
  .fail(function(reason) {
    res.send("yeah no. didn't work.");
  })
  .then(function(r) {
    var oauth_token = r[0];
    var oauth_token_secret = r[1];
    var results = r[2];

    req.session.oauth = {};
    req.session.oauth.token = oauth_token;
    req.session.oauth.token_secret = oauth_token_secret;
    res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token);
  });
};

exports.callback = function(req, res, next) {
  if (!req.session.oauth) next(new Error("you're not supposed to be here."));

  req.session.oauth.verifier = req.query.oauth_verifier;
  var oauth = req.session.oauth;

  getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier)
  .fail(function(reason) {
    res.send('yeah something broke.');
  })
  .then(function(r) {
    req.session.oauth.access_token = r[0];
    req.session.oauth.access_token_secret = r[1];
    req.session.twitter = {
      user_id: r[2].user_id,
      screen_name: r[2].screen_name
    };
    return findOne({id: req.session.twitter.user_id});
  })
  .then(function(user) {
    if (user && user.id) {
      _.extend(req.session.twitter, user);
      return;
    }
    var userId = req.session.twitter.user_id;
    return getWithOAuth(
      'http://api.twitter.com/1/users/show.json?id=' + userId,
      req.session.oauth.access_token,
      req.session.oauth.access_token_secret)
    .then(function(results) {
      var user = JSON.parse(results[0]);
      _.extend(req.session.twitter, user);
      // We won't wait this step.
      updateUser({ id: userId }, user, { upsert: true });
      return;
    }).done();
  })
  .then(function() {
    res.redirect('/');
  });

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

exports.requireAuthMW = function(req, res, next) {
  if (req.session.oauth &&
      req.session.oauth.access_token &&
      req.session.twitter &&
      req.session.twitter.id) {
    next();
    return;
  }
  res.status(403);
  res.end(JSON.stringify({
    error: 1,
    reason: 'Forbidden. You need authorization.'
  }));
};

exports.logout = function(req, res) {
  req.session.destroy();
  res.end(soy.render('app.soy.auth.logout', {
    isProduction: isProduction
  }));
};
