(function () {
  /* Add username and avatar to nav */
  if (getCookie('user') && getCookie('avatar')) {
    var user = getCookie('user');
    var avatar = getCookie('avatar');
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
function getCookie (cookiename) {
// Get name followed by anything except a semicolon
  var cookiestring = RegExp('' + cookiename + '[^;]+').exec(document.cookie);
// Return everything after the equal sign, or an empty string if the cookie name not found
  return unescape(cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '');
}
