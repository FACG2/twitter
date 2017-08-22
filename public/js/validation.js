// (function () {
//   var sigupFormInputs = document.querySelectorAll('#signupSection input');
//   var usernameInput = sigupFormInputs[0];
//   var passwordInput = sigupFormInputs[3];
//   var confirmPasswordInput = sigupFormInputs[4];
//   var signupNoteDiv = document.getElementsByClassName('errNote')[1];
//   var validation = {
//     email: false,
//     password: false,
//     confirmPassword: false
//   };
//   emailInput.addEventListener('focusout', function () {
//     if (isEmpty(this.value)) {
//       this.classList.add('wrongInput');
//       noteDiv.textContent = 'Email field is empty!';
//       validation.email = false;
//     } else if (!isValidEmail(this.value)) {
//       this.classList.add('wrongInput');
//       noteDiv.textContent = 'Email is invalid';
//       validation.email = false;
//     } else {
//       this.classList.remove('wrongInput');
//       validation.email = true;
//     }
//   });
//
//   passwordInput.addEventListener('focusout', function () {
//     if (isEmpty(this.value)) {
//       this.classList.add('wrongInput');
//       noteDiv.textContent = 'password is empty !';
//       validation.password = false;
//     } else if (!isValidPassword(this.value)) {
//       this.classList.add('wrongInput');
//       noteDiv.textContent = 'password is invalid , It should has minimum eight characters, at least one letter, one number and one special character:';
//       validation.password = false;
//     } else {
//       this.classList.remove('wrongInput');
//       validation.password = true;
//     }
//   });
//
//   confirmPasswordInput.addEventListener('focusout', function () {
//     if (isEmpty(this.value)) {
//       this.classList.add('wrongInput');
//       noteDiv.textContent = 'confirm password is empty!';
//       validation.comfirmPassword = false;
//     } else if (this.value !== passwordInput.value) {
//       this.classList.add('wrongInput');
//       noteDiv.textContent = 'Password fields are not matched!!';
//       validation.comfirmPassword = false;
//     } else {
//       this.classList.remove('wrongInput');
//       validation.comfirmPassword = true;
//     }
//   });
// })();
//
// function isValidEmail (email) {
//   var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return reg.test(email);
// }
//
// function isValidPassword (password) {
//   // Minimum eight characters, at least one letter, one number and one special character:
//   var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
//   return reg.test(password);
// }
// function isEmpty (value) {
//   return value.trim().length < 1;
// }
