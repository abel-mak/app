const {pool, query} = require('./mysql');
const mysql         = require('mysql');


async function addArticle(title, body, user_id)
{
	const sql    = 'INSERT INTO article (title, body, user_id) VALUES ?';
	const params = [[title, body, user_id]];

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

// SELECT * FROM (SELECT SUM(article_vote.vote) as vote, article.id as
// article_id ,article.title,article.body FROM article_vote RIGHT JOIN article
// ON article_id = article.id
// GROUP BY article.id) as votes LEFT JOIN
//(SELECT vote, article_id FROM article_vote WHERE user_id = 1) as user_votes
// ON votes.article_id = user_votes.article_id;
//======================
// SELECT SUM(article_vote.vote) as vote, article.id, article.title,
// article.body FROM article_vote RIGHT JOIN article ON article_id = article.id
// GROUP BY article.id;

// votes.id == article.id

async function getArticles(user_id)
{
	const sql =
	    'SELECT * FROM (SELECT SUM(article_vote.vote) as vote, article.id' +
	    ' ,article.title,article.body FROM article_vote' +
	    ' RIGHT JOIN article ON article_id = article.id' +
	    ' GROUP BY article.id) as votes LEFT JOIN' +
	    ' (SELECT' +
	    ' vote as user_vote, article_id FROM article_vote WHERE user_id = ?)' +
	    ' as all_user_votes ON votes.id = all_user_votes.article_id;';
	const params = [user_id];

	return query(sql, [params]);
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
	    ' ON DUPLICATE KEY UPDATE vote= (SELECT IF(vote=1, 0, 1))';
	const params = [[article_id, user_id, 1]];

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}
// SELECT votes.sum, votes.article_id, all_user_votes.vote
// FROM (SELECT SUM(vote) as sum, article_id FROM article_vote WHERE article_id
// = 9)
//  as votes LEFT JOIN (SELECT article_id, vote FROM article_vote WHERE user_id
//  = 10)
// as all_user_votes ON votes.article_id = all_user_votes.article_id;
//
async function downvote(article_id, user_id)
{
	const sql =
	    'INSERT INTO article_vote (article_id, user_id, vote) VALUES ?' +
	    ' ON DUPLICATE KEY UPDATE vote=(SELECT IF(vote=-1, 0, -1))';
	const params = [[article_id, user_id, 1]];

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

async function voteStatus(article_id, user_id)
{
	const sql = 'SELECT' +
	    ' votes.sum all_votes,votes.article_id,all_user_votes.vote as user_vote' +
	    ' FROM (SELECT' +
	    ' SUM(vote) as sum, article_id FROM article_vote WHERE article_id = ?)' +
	    ' as votes LEFT JOIN (SELECT' +
	    ' article_id, vote FROM article_vote WHERE user_id = ?)' +
	    ' as all_user_votes ON votes.article_id = all_user_votes.article_id;';
	const params = [article_id, user_id];
	return query(sql, params);
}

async function addComment(article_id, author, content, reply_to)
{
	const sql =
	    'INSERT INTO comments (article_id, author, content, reply_to) VALUES ?';

	const params = [[article_id, author, content, reply_to]];
	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

async function getComment(article_id)
{
	// const sql    = 'SELECT * FROM comments WHERE ?';
	const sql = 'SELECT user.username, comment_id, article_id, author,' +
	    ' UNIX_TIMESTAMP(created_at) * 1000 AS created_at' +
	    ' ,modified_at, content, reply_to  FROM comments INNER JOIN' +
	    ' (SELECT username, id FROM user) as user ON user.id = comments.author' +
	    ' AND ?';
	const params = {article_id};

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

getComment(10);

module.exports = {
	addArticle,
	getArticles,
	updateArticle,
	getArticleById,
	upvote,
	downvote,
	voteStatus,
	addComment,
	getComment
};
