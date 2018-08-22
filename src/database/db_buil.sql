BEGIN;
DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS votPost CASCADE;
DROP TABLE IF EXISTS votcomment CASCADE;



CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 user_name TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE,
 password TEXT NOT NULL
);

CREATE TABLE post (
id SERIAL PRIMARY KEY,
title TEXT NOT NULL,
description TEXT NOT NULL,
user_id INTEGER REFERENCES users(id),
img_post VARCHAR
);

CREATE TABLE comments (
id SERIAL PRIMARY KEY,
comment TEXT NOT NULL,
post_id INTEGER REFERENCES post(id),
user_id INTEGER REFERENCES users(id)
);

CREATE TABLE votPost (
post_id INTEGER REFERENCES post(id),
user_id INTEGER REFERENCES users(id),
votpostValue INTEGER DEFAULT 0,
PRIMARY KEY (post_id,user_id)
);


CREATE TABLE votcomment (
comment_id INTEGER REFERENCES comments(id),
user_id INTEGER REFERENCES users(id),
votcommentValue INTEGER DEFAULT 0,
PRIMARY KEY (comment_id,user_id)
);

INSERT INTO users (user_name,email,password) VALUES ('ssss','a@gmail.com','111i'),('lubna','lubna@gmail.com','111i');
INSERT INTO post (title,description,user_id,img_post)
 VALUES ('bbbb','blblabbb',1,'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&h=350'),
  ('bbbb2','blblabbb2',1,'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&h=350'),
  ('bbbb3','blblabbb3',1,'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&h=350');
INSERT INTO comments(comment,post_id,user_id) VALUES('nnnnnnn',1,1);
INSERT INTO votPost(post_id,user_id,votpostValue)
 VALUES (1,1,1),
(1,2,1),(2,1,0);
INSERT INTO votcomment(comment_id,user_id,votcommentValue) VALUES (1,1,5);


COMMIT;


