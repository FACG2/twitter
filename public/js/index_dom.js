(function () {
/* Sign up listener */
  var signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var signupData = event.target;
      var signupReq = {
        username: signupData[0].value,
        password: signupData[3].value,
        cpassword: signupData[4].value,
        gender: signupData[1].checked ? 'M' : 'F'
      };
      apiReq('/signup','POST', function (err, data) {// eslint-disable-line
        if (err) {
          document.getElementsByClassName('errNote')[1].textContent = 'Connection Error!';
        } else {
          if (data === '') {
            window.location.href = '/home';
          } else {
            document.getElementsByClassName('errNote')[1].textContent = data;
          }
        }
      }, JSON.stringify(signupReq));
    });
  }
/*
{
username,
password,
cpassword,
gender
}
*/
  /* Login listener */
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var loginData = event.target;
      var loginReq = {
        username: loginData[0].value,
        password: loginData[1].value
      };
      apiReq('/login','POST', function (err, data) {// eslint-disable-line
        if (err) {
          document.getElementsByClassName('errNote')[0].textContent = 'Connection Error!';
        } else {
          if (data === '') {
            window.location.href = '/home';
          } else {
            document.getElementsByClassName('errNote')[0].textContent = data;
          }
        }
      }, JSON.stringify(loginReq));
    });
  }
})();
