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


module.exports = {
	addArticle,
	getArticles
};
