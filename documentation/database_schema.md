**users Table ==>**
  - id (primary key , serial)
  - username (varchar(100) NOT NULL)
  - bio (text DEFAULT no description)
  - password (varchar(200) NOT NULL)
  - gender (varchar (1) NOT NULL)
  - avatar (varchar(100) DEFAULT defurl)

**tweets Table ==>**
  - id (primary key , serial)
  - owner_id (FK(users(id)))
  - context (text NOT NULL)
  - date (TIMESTAMP() NOT NULL)

**comments Table ==>**
- id (primary key , serial)
- owner_id (FK(users(id)))
- tweet_id (FK(tweets(id)))
- context (text NOT NULL)

[Back](https://github.com/FACG2/twitter/blob/master/README.md)
