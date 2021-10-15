USE test

CREATE TABLE IF NOT EXISTS comments(
	comment_id int(10) unsigned NOT NULL AUTO_INCREMENT,
	article_id int(10) unsigned NOT NULL,
	author int(10) unsigned NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modified_at TIMESTAMP,
	content TEXT(2500) NOT NULL,
	reply_to int(10) unsigned, -- reply to comment_id(if null it's reply to article)
	PRIMARY KEY (comment_id),
	FOREIGN KEY (author) REFERENCES user(id),
	FOREIGN KEY (article_id) REFERENCES article(id)
) ENGINE=InnoDB CHARSET=utf8mb4;

-- CREATE TRIGGER tr_comment BEFORE INSERT ON comments 
-- FOR EACH ROW SET comments.comment_id = UUID();
-- CREATE TRIGGER IF NOT EXISTS tr_comment BEFORE INSERT ON comments 
-- FOR EACH ROW SET NEW.comment_id = UUID()
