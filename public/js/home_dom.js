// recevedObject when user request Home{}
// expected cookie { payload:{ username : ' ' , avatarUrl : ' '}}
var navElements = {
  navElement: document.getElementById('userNav'),
  username: document.createElement('h4'),
  pAvatar: document.createElement('img')
};

var addTweetForm = document.getElementById('addTweetForm');

if (addTweetForm) {
  addTweetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var tweetText = event.target.firstElementChild.value;
        // expected response = { status : ' ' , ownerName:' ',tweetText:'',avatarUrl: 'http://someLinke!'}
    apiReq('/createtweet', 'POST', function (err, data) {
      if (err) {
        errorHandler('addTweet', err);
      } else {
        if (JSON.parse(data).status) {
          renderTweet(JSON.parse(data));
        } else {
          errorHandler('addTweet', 'Cannot add tweet Right now');
        }
      }
    }, tweetText);
  });
}
// just to be more specific ,we check if there is acookie and there is a username in the payload
if (document.cookie && document.cookie.payload.username !== undefined) {
  navElements.username.textContent = cookie.payload.username;
  navElements.pAvatar.src = cookie.payload.avatarUrl;
} else {
  window.addEventListener('onload', function (e) {
    e.preventDefault();
    // render the nav bar
    // expected response = { username : ' ' , avatarUrl: 'http://someLinke!'}
    apiReq('/getuserData', 'GET', (err, res) => {
      if (err) {
        errorHandler(err, 'nav');
      } else {
        res = JSON.parse(res);
        navElements.username.textContent = res.username;
        navElements.pAvatar.src = res.avatarUrl;
      }
    });
  });
}

// handler errors comming from the server
function errorHandler (err, location) {
  switch (location) {
    case 'addTweet':
      document.getElementById('tweetInput').textContent = err;
      break;
    case 'getalltweets':
      document.getElementsByClassName('recentTweets')[0].textContent = err;
      break;
    default:
      alert(err);
  }
}

function renderTweet (response) {
// profile avatar , user name(tweet owner) , singleTweet = tweetBody
  var tweetText = response.tweetText;
  var tweetOwner = response.ownerName;
  var tweetAvataUrl = response.avatarUrl;

  var tweetList = document.querySelector('.recentTweets');

  var avatar = document.querySelector('.tweetHeader > img')[0];
  avatar.src = tweetAvataUrl;
  tweetList.appendChild(avatar);
  var tweeterName = document.querySelector('.tweetHeader > h6')[0];
  tweeterName.textContent = tweetOwner;
  tweetList.appendChild(tweeterName);
  var tweetBody = document.querySelector('.singleTweet > p')[0];
  tweetBody.textContent = tweetText;
  tweetList.appendChild(tweetBody);
}

window.addEventListener('onload', (e) => {
  // { tweetNumber : 10 , tweets:[t1:{tweetText:' ' , ownerName:'' , avatarUrl},t2 ,t3]}
  e.preventDefault();
  apiReq('/getalltweets', 'GET', (err, res) => {
    if (err) {
      errorHandler(err, 'getalltweets');
    } else {
      res = JSON.parse(res);
      res.tweets.forEach(function (tweet) {
        renderTweet(tweet);
      });
    }
  });
});
