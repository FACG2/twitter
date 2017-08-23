(function () {
  apiReq(window.location.pathname+'/getData','GET', function (err, data) {// eslint-disable-line
    if (err || data === '') {
      document.getElementsByClassName('mainContent')[0].innerHTML = '<h1>Connection Error!</h1>';
    } else {
      var usersInfo = JSON.parse(data);
      document.querySelector('.info h2').textContent = usersInfo.username;
      if (usersInfo.gender === 'M') {
        document.querySelectorAll('.info p')[1].textContent = 'Male';
      } else {
        document.querySelectorAll('.info p')[1].textContent = 'Female';
      }
      document.querySelectorAll('.info p')[0].textContent = usersInfo.bio;
      document.getElementById('profileAvatar').setAttribute('src', usersInfo.avatar);
      document.getElementById('profileAvatar').setAttribute('alt', usersInfo.username);
    }

    /* List tweets */
    apiReq(window.location.pathname+'/tweets','GET', function (err, data) {// eslint-disable-line
      console.log(data);
      if (err) {
        document.getElementsByClassName('mainContent')[0].innerHTML = '<h1>Connection Error!</h1>';
      } else if (data === '[]') {
        document.getElementById('userTweets').innerHTML = '<h2>' + window.location.pathname.split('/')[2] + ' has no Tweets!</h2>';
      } else {
        var userstweets = JSON.parse(data);
        document.getElementById('userTweets').innerHTML = generateTweetsDivs(usersInfo.avatar, usersInfo.username, userstweets);
      }
    });
  });
})();

function generateTweetsDivs (avatar, username, tweetsArray) {
  return tweetsArray.reduce(function (acc, tweet) {
    return acc += '<div class="userTweet">' +
              '<div class="tweetHeader">' +
                '<img src="' + avatar + '" alt="' + username + '">' +
                '<div class="headerP">' +
                  '<p>' + username + '</p>' +
                  '<p class="headerDate">' + tweet.date + '</p>' +
                '</div>' +
              '</div>' +
            '<p class="tweetBody">' + tweet.context + '</p>' +
          '</div>';
  }, '');
}
