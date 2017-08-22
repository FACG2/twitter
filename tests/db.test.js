const connection = require('../database/db_connection.js');
const test = require('tape');

test('Testing database connection', (t) => {
  const sql = '';
  connection.query(sql, (err, res) => {
    if (err) {
      t.notOk(!err, err);
      t.end();
    } else {
      t.equal(res != null, true, 'Should not be empty');
      t.end();
    }
  });
});

test('Testing queries on the database', (t) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, res) => {
    if (err) {
      t.notOk(!err, err);
      t.end();
    } else {
      t.equal(res.rows.length, 2, 'Should not be empty');
      t.end();
      connection.end();
    }
  });
});
