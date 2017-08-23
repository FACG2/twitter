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
      apiReq(signupReq, function (err, data) {// eslint-disable-line
        if (err) {
          document.getElementsByClassName('errNote')[1].textContent = 'Connection Error!';
        } else {
          document.getElementsByClassName('errNote')[1].textContent = data;
        }
      });
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
})();
