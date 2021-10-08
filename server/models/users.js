const {pool, query} = require('./mysql');
const mysql         = require('mysql');
const crypto        = require('crypto');

async function add(firstName, lastName, username, password)
{
	const sql =
	    'INSERT INTO user (firstName, lastName, username, password) VALUES ?;';
	const params = [[firstName, lastName, username, password]];

	return query(sql, [params]);
}

async function remove(id)
{
	const sql    = 'DELETE FROM user WHERE id = ?';
	const params = id;

	return query(sql, [params]);
}

async function getSession(id)
{
	const sql    = 'SELECT sessionId FROM user WHERE id = ?';
	const params = id;

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

async function setSession(id)
{
	const sessionId = crypto.randomBytes(50).toString('hex');
	const sql       = 'UPDATE user SET ? WHERE id = ?';
	const expires   = mysql.raw('date_add(now(), INTERVAL 1 DAY)');
	const params    = {sessionId, expires};

	// console.log(mysql.raw('CURRENT_TIMESTAMP()').toSqlString());
	// console.log(mysql.format(sql, [params, id]));
	return query(sql, [params, id]);
}

async function getUserByUserName(username)
{
	const sql    = 'SELECT id, firstName, lastName, password FROM user WHERE ?';
	const params = {username};

	return query(sql, [params]);
}

async function getUserById(id)
{
	const sql    = 'SELECT id, firstName, lastName, password FROM user WHERE ?';
	const params = {id};

	return query(sql, [params]);
}

async function destroySession(sessionId)
{
	const sql    = 'UPDATE user SET ? WHERE sessionId = ?';
	const params = {sessionId: null, expires: null};

	// console.log(mysql.format(sql, [params, username]));
	return query(sql, [params, sessionId]);
}

async function getUserBySessionId(sessionId)
{
	const sql    = 'SELECT * FROM user WHERE ?';
	const params = {sessionId};

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

async function isValidSession(sessionId)
{
	const sql    = 'SELECT expires > now() AS result FROM user WHERE ?';
	const params = {sessionId};

	// console.log(mysql.format(sql, [params]));
	return query(sql, [params]);
}

module.exports = {
	add,
	remove,
	setSession,
	getSession,
	getUserByUserName,
	destroySession,
	getUserBySessionId,
	isValidSession,
	getUserById
};
