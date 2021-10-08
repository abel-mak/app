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
	title varchar(255) NOT NULL DEFAULT 'empty-title',
	body text(1000) NOT NULL,
	user_id int(10) unsigned NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- CREATE TABLE IF NOT EXISTS `user` (
--   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `uuid` char(32) NOT NULL COMMENT '用户uuid',
--   `username` varchar(255) COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
--   `signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci default '' COMMENT '个性签名',
--   `email` varchar(255) COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户邮箱',
--   `password` varchar(255) NOT NULL DEFAULT '' COMMENT '密码',
--   `register_time` datetime NOT NULL COMMENT '注册时unix时间戳',
--   `register_ip` int(10) unsigned NOT NULL DEFAULT 0 COMMENT '注册时ip',
--   `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '用户状态，0正常，1封号',
--   `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
--   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
--    PRIMARY KEY (`id`),
--    KEY `uuid` (`uuid`),
--    KEY `username` (`username`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4
