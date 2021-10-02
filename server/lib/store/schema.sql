USE test

CREATE TABLE IF NOT EXISTS sessions(
	session_id VARCHAR(128) COLLATE utf8mb4_bin,
	expires int(11) unsigned NOT NULL,
	data mediumtext COLLATE utf8mb4_bin,
	PRIMARY KEY(session_id)
) ENGINE=InnoDB

-- MyISam InnoDB
