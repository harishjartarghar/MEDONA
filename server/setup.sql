CREATE DATABASE IF NOT EXISTS MEDONA;
USE MEDONA;




CREATE TABLE IF NOT EXISTS  donors(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	mobile varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	PRIMARY KEY(id) 
);



CREATE TABLE IF NOT EXISTS ngos(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY(id) 
);


CREATE TABLE IF NOT EXISTS mobiles(
	id int NOT NULL AUTO_INCREMENT,
	ngo_id int,
	mobile varchar(255),
	PRIMARY KEY(id),
	FOREIGN KEY(ngo_id) REFERENCES ngos(id)

);

CREATE TABLE IF NOT EXISTS address(
	id int,
	street varchar(255),
	city varchar(255),
	district varchar(255),
	state varchar(255),
	pincode varchar(255),
	PRIMARY KEY(id)
);

