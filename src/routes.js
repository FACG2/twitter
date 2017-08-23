const handler = require('./hanlders.js');

module.exports = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/login' && method === 'POST') {
    handler.loginHandler(req, res);
  } else if (url === '/signup' && method === 'POST') {
    handler.signupHandler(req, res);
  } else if (url.startsWith('/users/') && method === 'GET') {
    let urlParts = url.split('/');
    if (urlParts[3] === 'getData') { // get profile info
      handler.getProfileInfoHandler(req, res, urlParts[2]);
    } else if (urlParts[3] === 'tweets') { // get user tweets
      console.log('www');
      handler.getProfileTweetsHandler(req, res, urlParts[2]);
    } else if (urlParts.length === 3) { // get profile page
      req.url = 'profile.html';
      handler.genaricHandler(req, res);
    } else {
      req.url = req.url.replace('/users/', '/');// /users/css/style.css
      handler.genaricHandler(req, res);
    }
  } else if (url === '/createtweet') {
    handler.createtweet(req, res);
  } else if (url === '/getalltweets') {
    handler.getalltweets(req, res);
  } else if (url === '/getuserData') {
    handler.getuserData(req, res);
  } else {
    handler.genaricHandler(req, res);
  }
};

/*
{ status : ' ' , ownerName:' ',tweetText:'',avatarUrl: 'http://someLinke!'}
/createtweet
'GET /' ==>homepage - login
'POST /login' ==> login
'POST /signup' ==> Signup

'GET /home.html'
'GET /home/getData' ==>xhr for add tweets needed user data(avatar name id)
'POST /deletetwt'
'POST /edittwt'
'POST /createTweet'

'generic'

'GET /users/:username' ==> render profile.html
'GET /users/:username/getData' ==>xhr getuserData\ {avatar , gender , bio , numberof tweets,username}
'GET /users/:username/tweets'
*/
