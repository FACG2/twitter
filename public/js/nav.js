(function () {
  /* Add username and avatar to nav */
  var cookies = document.cookie.split(/=|;/);
  if (cookies.includes('user') || cookies.includes(' avatar')) {
    var user = cookies[cookies.indexOf('user') + 1];
    var avatar = cookies[cookies.indexOf(' avatar') + 1];
    document.getElementById('userNav').innerHTML = '<p id="logout">Log out</p>' +
                                          '<div class="navUser">' +
                                            '<a href="/users/' + user + '"><img src="' + avatar + '" alt="' + user + '"></a>' +
                                            '<p>' + user + '</p>';

    var logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function () {
      logoutFun();
    });
  } else {
    logoutFun();
  }
})();
function logoutFun () {
  removeCookies();
  window.location.href = '/';
}
function removeCookies () {
  document.cookie.split(';').forEach(function (c) { document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/'); });
  document.cookie = '';
  // if (document.cookie !== '') {
  //   document.cookie += '; max-age=0';
  //   removeCookies();
  // }
}
