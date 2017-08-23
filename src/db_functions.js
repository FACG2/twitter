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
// errorMsg
// { status : ' ' , ownerName:' ',tweetText:'',avatarUrl: 'http://someLinke!' ,errorMsg:''}
 const insertTweet = (userName, tweetText, cb) => {
   getUserId(userName, (err, user) => {
     if (err) {
       cb(err);
     } else {
       const sql = {
         text: 'INSERT INTO tweets (owner_id , context ,date) VALUES ($1 , $2 ,to_timestamp($3))',
         values: [user.id, tweetText, Date.now() / 1000 ]
       };
       dbConnection.query(sql, (err, res) => {
         if (err) {
           cb(err);
         } else {
           const tweetDetails = {};
           tweetDetails.status = true;
           tweetDetails.ownerName = user.username;
           tweetDetails.tweetText = tweetText;
           tweetDetails.avatarUrl = user.avatar;
           tweetDetails.errorMsg = '';
           cb(null, tweetDetails);
         }
       });
     }
   });
 };
 const getUserId = (username, cb) => {
   const sql = {
     text: 'SELECT * from users where username= $1',
     values: [username]
   };
   dbConnection.query(sql, (err, user) => {
     if (err) {
       cb(err);
     } else {
       cb(null, user.rows[0]);
     }
   });
 };
 insertTweet('eslam', 'hellloww foks!! ^_^', (err, res) => {
   if (err) {
     console.log(err);
   }
   console.log(res);
 });
 module.exports = {
   loginQuery,
   addUser,
   searchUser
 };
