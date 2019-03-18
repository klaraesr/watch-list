use rosquis;

drop table user;
drop table toWatchList;
drop table watchedList;
drop table movie;

create table user (
id varchar(36) NOT NULL,
username varchar(64) UNIQUE,
password varchar(64)
);

insert into user values ('1','Christine', 'hej123');

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
id varchar(36) NOT NULL,
name varchar(36),
image varchar(128),
watchlist_id varchar(36),
watchedlist_id varchar(36)
);

insert into movie values ('1','Taken','https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all','1','1');

SELECT * FROM user;
SELECT * FROM toWatchList;
SELECT * FROM watchedList;
SELECT * FROM movie;