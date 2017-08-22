 const dbConnection = require('../database/db_connection.js');

 const loginQuery = (username, password, cb) => {
   dbConnection.query(`SELECT users.username from users where  users.username  = ${username} AND users.password=${password}`, (err, res) => {
     if (err) {
       cb(err);
     } else {
       cb(null, res.rows);
     }
   });
 };

 const searchUser = (username, cb) => {
   dbConnection.query(`SELECT users.username from users where  users.username  = ${username} `, (err, res) => {
     if (err) {
       cb(err);
     } else {
       cb(null, res.rows);
     }
   });
 };

const addUser = (obj, cb) => {// eslint-disable-line
  dbConnection.query(`INSERT INTO users (username ,password,gender) VALUES ('${obj.username}', ${obj.password}, '${obj.gender}')`, (err, res) => {
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
