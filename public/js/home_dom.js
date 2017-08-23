// recevedObject when user request Home{}
//
var addTweetForm = document.getElementById('addTweetForm');

if (addTweetForm) {
  addTweetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var tweetText = event.target.firstElementChild.value;
    addTweet(tweetText, function (data) {
      if (err) {
        errorHandler('addTweet', err);
      } else {
        if (data.addTweet.status) {
          renderTweets(data);
        } else {
          errorHandler('addTweet', 'Cannot add tweet Right now');
        }
      }
    });
  });
}

function errorHandler (err, location) {
  switch (location) {
    case 'addTweet':
      document.getElementById('tweetInput').textContent = err;
      break;
    default:
      alert(err);

  }
}
function renderTweets (response) {
// profile avatar , user name(tweet owner) , singleTweet = tweetBody
  if (response.status) {
    var tweetText = document.getElementById('tweetText').value;
    var tweetOwner = response.userName;
    var tweetAvataUrl = response.avatarUrl;

    var tweetList = document.querySelector('.recentTweets');

    var avatar = document.querySelector('.tweetHeader img')[0];
    avatar.src = tweetAvataUrl;
    tweetList.appendChild(avatar);
    var tweeterName = document.querySelector('.tweetHeader h6')[0];
    tweeterName.textContent = tweetOwner;
    tweetList.appendChild(tweeterName);
    var tweetBody = document.querySelector('.singleTweet p')[0];
    tweetBody.textContent = tweetText;
    tweetList.appendChild(tweetBody);
  } else {
    errorHandler(response.error + response.message, 'addTweet');
  }

}
