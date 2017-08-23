const dbfunctions = require('./db_functions.js');
const { createHash } = require('crypto');

function loginValidation (username, password, cb) {
  var loginRet = {msg: '', userRes: ''};
  if (username.trim().length < 1) {
    loginRet.msg = 'username is empty';
    cb(null, loginRet);
  } else {
    const hashedPassword = createHash('sha256').update(password).digest('hex');
    dbfunctions.loginQuery(username, hashedPassword, (err, ress) => {
      if (err) {
        loginRet.msg = 'Database connection error';
        cb(err, loginRet);
      } else if (ress.length === 0) {
        loginRet.msg = 'user name or password is not correct';
        cb(null, loginRet);
      } else {
        loginRet.userRes = ress[0].username;
        loginRet.avatar = ress[0].avatar;
        loginRet.msg = '';
        cb(null, loginRet);
      }
    });
  }
}

// loginValidation('walid', '123456', (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });

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
        signupRet.msg = 'invalid register';
        cb(err, signupRet);
      } else if (ress.length === 0) {
        const hashedPassword = createHash('sha256').update(signupData.password).digest('hex');
        signupData.password = hashedPassword;
        signupRet.userRes = signupData.username;
        if (signupData.gender === 'F') {
          signupData.avatar = 'https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_beanie_girl-512.png';
        } else {
          signupData.avatar = 'https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_handsome_guy-512.png';
        }
        dbfunctions.addUser(signupData, (err2, ress2) => {
          if (err2) {
            signupRet.msg = 'Database connection error';
            cb(err2, signupRet);
          } else {
            signupRet.avatar = signupData.avatar;
            cb(null, signupRet);
          }
        });
      } else {
        signupRet.msg = 'username is already a member';
        cb(null, signupRet);
      }
    });
  }
}
module.exports = {
  loginValidation,
  signupValidation
};
