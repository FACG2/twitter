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




INSERT INTO users (username,bio,password,gender,avatar) VALUES ('kelhelou','no bio','123456','f','http://www.google.com');
INSERT INTO users (username,bio,password,gender,avatar) VALUES ('Islam','no bio','123456','m','http://www.google.com');



INSERT INTO tweets (owner_id,context,date) VALUES (1,'no context', current_date);
INSERT INTO tweets (owner_id,context,date) VALUES (2,'no context', current_date);

INSERT INTO comments (owner_id,tweet_id,context) VALUES (2,1,'nice');
INSERT INTO comments (owner_id,tweet_id,context) VALUES (1,2,'great');




COMMIT;
