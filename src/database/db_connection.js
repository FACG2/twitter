const {Pool} = require('pg');
// require('env2')('./config.env');
process.env.DATABASE_URL = 'postgres://jopfbvotzylhye:cd9d1347c5c1bcf467f7f8525b8878d5656266dd32176b4461c585dc28a7314b@ec2-107-22-167-179.compute-1.amazonaws.com:5432/ddo2f7ukgcdbsu?ssl=true';
if (!process.env.DATABASE_URL) {
  throw new Error('No DATABASE_URL provided');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = pool;
