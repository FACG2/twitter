const handler = require('./hanlders.js');

module.exports = (req, res) => {
  const url = req.url;
  if (url === '/login') {
    handler.loginHandler(req, res);
  } else if (url === '/signup') {
    handler.signupHandler(req, res);
  } else if (url === '/createtweet') {
    handler.createtweet(req, res);
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

'GET /user:id' ==> render profile.html
'GET /user:id/getData' ==>xhr getuserData\

*/
