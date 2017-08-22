const fs = require('fs');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const validation = require('./validation.js');
function genaricHandler (req, res) {
  let url = req.url;
  if (url === '/') {
    url = 'index.html';
  }
  let parts = url.split('.');
  const fileExtention = parts[parts.length - 1];

  const contentTypes = {
    css: 'text/css',
    html: 'text/html',
    js: 'application/javascript',
    ico: 'image/x-icon'
  };
  console.log(__dirname + '/../public/' + url);
  fs.readFile(__dirname + '/../public/' + url, (err, data) => {
    if (err) {
      fs.readFile(__dirname + '/../public/404.html', (err2, data2) => {
        if (err2) {
          res.writeHead(500, {
            'Content-Type': 'text/html'
          });
          res.end('<h1>500 , Server Error</h1>');
        } else {
          res.writeHead(404, {
            'Content-Type': 'text/html'
          });
          res.end(data2);
        }
      });
    } else {
      res.writeHead(200, {
        'Content-Type': contentTypes[fileExtention]
      });
      res.end(data);
    }
  });
}

function loginHandler (req, res) {
  let loginData = '';
  req.on('data', (chunk) => {
    loginData += chunk;
  });
  req.on('end', () => {
    validation.loginValidation(loginData.username, loginData.password, (error, result) => {
      if (error || result.msg !== '') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(result.msg);
      } else {
        var token = jwt.sign({userName: result.userRes}, 'twitter shhh');
        res.writeHead(302, {'Location': '/home', 'Set-Cookie': `token=${token}`});
        response.end();
      }
    });
  });
  req.on('error', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Connection Error');
  });
}

function signupHandler (req, res) {
  let signupData = '';
  req.on('data', (chunk) => {
    signupData += chunk;
  });
  req.on('end', () => {
    validation.signupValidation(signupData, (error, result) => {
      if (error || result.msg !== '') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(result.msg);
      } else {
        var token = jwt.sign({userName: result.userRes}, 'twitter shhh');
        res.writeHead(302, {'Location': '/home', 'Set-Cookie': `token=${token}`});
        response.end();
      }
    });
    if (result.isValid) {
      result.id = validation.addNewUser(signupData);
      var token = jwt.sign({userName: signupData.username}, 'twitter shhh');
      res.writeHead(302, {'Location': '/home', 'Set-Cookie': `token=${token}`});
      response.end();
    }
  });
  req.on('error', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Connection Error');
  });
}

module.exports = {
  genaricHandler,
  loginHandler,
  signupHandler
};
