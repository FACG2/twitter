 const dbConnection = require('./database/db_connection.js');

 const loginQuery = (username, password, cb) => {
   dbConnection.query(`SELECT users.username, users.avatar from users where  users.username  = '${username}' AND users.password= '${password}'`, (err, res) => {
     if (err) {
       cb(err);
     } else {
       cb(null, res.rows);
     }
   });
 };

 const searchUser = (username, cb) => {
   dbConnection.query(`SELECT users.username from users where  users.username  = '${username}'`, (err, res) => {
     if (err) {
       cb(err);
     } else {
       cb(null, res.rows);
     }
   });
 };


const addUser = (obj, cb) => {// eslint-disable-line
  dbConnection.query(`INSERT INTO users (username ,password,gender,avatar) VALUES ('${obj.username}', '${obj.password}', '${obj.gender}','${obj.avatar}')`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const profileInfo = (username, cb) => {
  dbConnection.query(`SELECT users.username, users.bio, users.avatar, users.gender from users where  users.username  = '${username}'`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const profileTweets = (username, cb) => {
  dbConnection.query(`SELECT context, date FROM tweets WHERE owner_id=(select id from users where username='${username}')`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};



 module.exports = {
   loginQuery,
   addUser,
   searchUser,
   profileInfo,
   profileTweets
 };
