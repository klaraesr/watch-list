use rosquis;

drop table user;
drop table toWatchList;
drop table watchedList;
drop table movie;

create table user (
id varchar(36) NOT NULL,
username varchar(64) UNIQUE,
password varchar(64),
image varchar(128),
deletehash varchar(64)
);

insert into user values ('1','christine', 'hej123','http://www.clker.com/cliparts/e/d/7/b/13426765571224390078nemo-md.png','test');

create table toWatchList (
id varchar(36) NOT NULL,
user_id varchar(36)
);

insert into toWatchList values ('1','1');

create table watchedList (
id varchar(36) NOT NULL,
user_id varchar(36)
);

insert into watchedList values ('1','1');

create table movie (
id varchar(36) NOT NULL UNIQUE,
movie_id varchar(36),
name varchar(128),
image varchar(128),
watchlist_id varchar(36),
watchedlist_id varchar(36),
updated_at datetime,
created_at datetime
);

insert into movie values ('1', '424783','Bumblebee','/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg','1','1', null, null);

SELECT * FROM user;
SELECT * FROM toWatchList;
SELECT * FROM watchedList;
SELECT * FROM movie;
