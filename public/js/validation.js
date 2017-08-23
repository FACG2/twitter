var validation = {
  user: false,
  password: false,
  confirmPassword: false
};
(function () {
  var sigupFormInputs = document.querySelectorAll('#signupSection input');
  var usernameInput = sigupFormInputs[0];
  var passwordInput = sigupFormInputs[3];
  var confirmPasswordInput = sigupFormInputs[4];
  var submitSignup = document.querySelector('#signupSub');
  var signupNoteDiv = document.getElementsByClassName('errNote')[1];
  var validationErrors = {username: '', password: '', confirmPassword: ''};
  submitSignup.disabled = !(isFormValid(validation));
  usernameInput.addEventListener('focusout', function () {
    if (this.value.length < 2) {
      this.classList.add('wrongInput');
      validationErrors.username = 'username is invalid';
      validation.user = false;
    } else {
      this.classList.remove('wrongInput');
      validation.user = true;
      validationErrors.username = '';
    }
    signupNoteDiv.textContent = errorMessages(Object.values(validationErrors));
    submitSignup.disabled = !(isFormValid(validation));
  });

  passwordInput.addEventListener('focusout', function () {
    if (!isValidPassword(this.value)) {
      this.classList.add('wrongInput');
      validationErrors.password = 'password is invalid , password must be at least 7 characters';
      validation.password = false;
    } else {
      this.classList.remove('wrongInput');
      validation.password = true;
      validationErrors.password = '';
    }
    signupNoteDiv.textContent = errorMessages(Object.values(validationErrors));
    submitSignup.disabled = !(isFormValid(validation));
  });

  confirmPasswordInput.addEventListener('focusout', function () {
    if (this.value !== passwordInput.value) {
      this.classList.add('wrongInput');
      validationErrors.confirmPassword = 'Password fields are not matched!!';
      validation.confirmPassword = false;
    } else {
      this.classList.remove('wrongInput');
      validation.confirmPassword = true;
      validationErrors.confirmPassword = '';
    }
    signupNoteDiv.textContent = errorMessages(Object.values(validationErrors));
    submitSignup.disabled = !(isFormValid(validation));
  });
  signupNoteDiv.textContent = errorMessages(Object.values(validationErrors));
})();
function errorMessages (messages) {
  return messages.reduce(function (acc, message) {
    if (message !=='') {
      acc += ', ' + message;
    }
    return acc;
  }, '');
}
function isFormValid (sourceOfTrue) {
  return Object.values(sourceOfTrue).reduce(function (acc, source) {
    acc = source ? acc : false;
    return acc;
  }, true);
}
function isValidPassword (password) {
  //  Minimum eight characters, at least one letter, one number and one special character:
  // var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  // return reg.test(password);
  return password.length > 6;
}
