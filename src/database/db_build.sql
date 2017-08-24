BEGIN;

DROP TABLE IF EXISTS users, tweets, comments CASCADE;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username  VARCHAR(100) NOT NULL,
bio  TEXT DEFAULT 'No description',
password VARCHAR(200) NOT NULL ,
gender VARCHAR(1) NOT NULL,
avatar VARCHAR(100) DEFAULT 'defurl'
);

CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id),
  context TEXT NOT NULL,
  date TIMESTAMP NOT NULL
);

CREATE TABLE comments (
id SERIAL PRIMARY KEY,
owner_id INTEGER REFERENCES users(id),
tweet_id INTEGER REFERENCES tweets(id),
context TEXT NOT NULL
);

COMMIT;
