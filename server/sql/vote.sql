USE test

CREATE TABLE IF NOT EXISTS article_vote (
	article_id INT(10) UNSIGNED NOT NULL,
	user_id INT(10) UNSIGNED NOT NULL,
	vote TINYINT NOT NULL CHECK(vote > -2 AND vote < 2),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(article_id, user_id),
	FOREIGN KEY(article_id) REFERENCES article(id) ON DELETE CASCADE,
	FOREIGN KEY(user_id) REFERENCES user(id)
);

-- ON DELETE CASCADE constraint is used in MySQL to delete the rows from the 
-- child table automatically,

