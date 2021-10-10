USE test

CREATE TABLE IF NOT EXISTS user (
	id int(10) unsigned NOT NULL AUTO_INCREMENT,
	firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL DEFAULT '',
	sessionId varchar(255),
	expires datetime,
	PRIMARY KEY (id),
	UNIQUE KEY username (username)
)	ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS article (
	id int(10) unsigned NOT NULL AUTO_INCREMENT,
	title varchar(255) NOT NULL DEFAULT 'NO TITLE',
	body text(1000) NOT NULL,
	user_id int(10) unsigned NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
