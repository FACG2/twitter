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

 module.exports = {
   loginQuery,
   addUser,
   searchUser
 };
