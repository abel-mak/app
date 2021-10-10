const {pool, query} = require('./mysql');
const mysql         = require('mysql');


async function addArticle(title, body, user_id)
{
	const sql    = 'INSERT INTO article (title, body, user_id) VALUES ?';
	const params = [[title, body, user_id]];

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

async function getArticles()
{
	const sql = 'SELECT * FROM article';

	return query(sql);
}

async function updateArticle(id, title, body)
{
	const sql    = 'UPDATE article SET ? WHERE id = ?';
	const params = {title, body};

	// console.log(mysql.format(sql, [params, id]));
	return query(sql, [params, id]);
}

async function getArticleById(id)
{
	const sql    = 'SELECT * FROM article WHERE ?';
	const params = {id};

	return query(sql, [params]);
}

async function upvote(article_id, user_id)
{
	const sql =
	    'INSERT INTO article_vote (article_id, user_id, vote) VALUES ?' +
	    ' ON DUPLICATE KEY UPDATE vote=1';
	const params = [[article_id, user_id, 1]];

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

async function downvote(article_id, user_id)
{
	const sql =
	    'INSERT INTO article_vote (article_id, user_id, vote) VALUES ?' +
	    ' ON DUPLICATE KEY vote=-1';
	const params = [[article_id, user_id, 1]];

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

module.exports = {
	addArticle,
	getArticles,
	updateArticle,
	getArticleById,
	upvote,
	downvote,
};
