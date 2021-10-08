USE test

CREATE TABLE IF NOT EXISTS comments(
	comment_id VARCHAR(40) NOT NULL,
	author int(10) unsigned NOT NULL,
	created_at int(11) unsigned NOT NULL, -- seconds
	modified_at int(11) unsigned NOT NULL,
	content TEXT(5000) NOT NULL,
	reply_to VARCHAR(40) NOT NULL, -- reply to comment_id
	PRIMARY KEY (comment_id)
) ENGINE=InnoDB CHARSET=utf8mb4;

-- CREATE TRIGGER tr_comment BEFORE INSERT ON comments 
-- FOR EACH ROW SET comments.comment_id = UUID();
CREATE TRIGGER IF NOT EXISTS tr_comment BEFORE INSERT ON comments 
FOR EACH ROW SET NEW.comment_id = UUID()
