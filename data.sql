use rosquis; # Byt till eget användarnamn

drop table user; # Om det finns en tidigare databas
drop table toWatchList; --De filmer användaren vill se
drop table watchedlist; --De filmer användaren har sett
drop table movie;

create table user (
id varchar(36) NOT NULL,
name varchar(64),
email varchar(64) UNIQUE,
password varchar(64)
);

insert into user values ("1",'Christine','rosquis@kth.se', 'hej123');

create table toWatchList (
id varchar(36) NOT NULL,
user_id varchar(36),
);

insert into toWatchList values ("1","1");

create table watchedlist (
id varchar(36) NOT NULL,
user_id varchar(36),
);

insert into watchedlist values ("1","1");

create table movie (
id varchar(36) NOT NULL,
image varchar(64),
watchlist_id varchar(36),
watchedlist_id varchar(36)
name varchar(36)
);

insert into movie values ("1",'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all',"1","1", 'Taken');

SELECT * FROM user;
SELECT * FROM toWatchList;
SELECT * FROM watchedlist;