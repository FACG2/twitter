const {Pool} = require('pg');
require('env2')('./config.env');
const DB_URL = process.env.DATABASE_URL; // || 'postgres://kefah:kefah@localhost:5432/twitter';
if (!DB_URL) {
  throw new Error('No DATABASE_URL provided');
}

const pool = new Pool({ connectionString: DB_URL });

module.exports = pool;
