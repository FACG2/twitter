const dbfunctions = require('./db_functions.js');

function loginValidation (username, password, cb) {
  var loginRet = {msg: '', userRes: ''};
  if (username.trim().length < 1 || password.length < 6) {
    loginRet.msg = 'username is empty or password is less than 6 char';
    cb(null, loginRet);
  } else {
    dbfunctions.loginQuery(username, password, (err, ress) => {
      if (err) {
        loginRet.msg = 'Database connection error';
        cb(err, loginRet);
      } else if (ress.length === 0) {
        loginRet.msg = 'username is not  register';
        cb(null, loginRet);
      } else {
        loginRet.userRes = username;
        cb(null, loginRet);
      }
    });
  }
}

function signupValidation (signupData, cb) {
  let signupRet = {msg: '', userRes: ''};
  if (signupData.username.trim().length < 1 || signupData.password.length < 6 || signupData.cpassword.length < 6 || signupData.gender < 1) {
    signupRet.msg = 'username or gender is empty or password is less than 6 char';
    cb(null, signupRet);
  } else if (signupData.password !== signupData.cpassword) {
    signupRet.msg = 'password didnt matched';
    cb(null, signupRet);
  } else {
    dbfunctions.searchUser(signupData.username, (err, ress) => {
      if (err) {
        loginRet.msg = 'invalid register';
        cb(err, signupRet);
      } else if (ress.length === 0) {
        signupRet.userRes = signupData.username;
        dbfunctions.addUser(signupData, (err2, ress2) => {
          if (err2) {
            loginRet.msg = 'Database connection error';
            cb(err2, loginRet);
          } else {
            cb(null, signupRet);
          }
        });
      } else {
        loginRet.msg = 'username is already a member';
        cb(null, signupRet);
      }
    });
  }
}

module.exports = {
  loginValidation,
  signupValidation
};
