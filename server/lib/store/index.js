const {mysql, query} = require('../../models/mysql');

// convert date to seconds UNIX_TIMESTAMP(date) returns unsigned integer
// convert seconds to date FROM_UNIXTIME (seconds) return date

module.exports = function(session)
{
	const Store = session.Store;

	const noop = () => {};

	class MysqlStore extends Store
	{
		constructor(options = {})
		{
			super(options);
			this.expirationInterval = 86400;  // One day in seconds.
		}
		async get(sid, callback)
		{
			try
			{
				const sql = 'SELECT data FROM sessions ' +
				    'WHERE session_id = ? AND expires > UNIX_TIMESTAMP()';
				const params  = sid;
				const row     = await query(sql, [params]);
				const session = (row != false) ? JSON.parse(row[0].data) : null;

				callback(null, session);
			}
			catch (e)
			{
				console.log({func: 'set', e});
				callback(e);
			}
		}
		async set(sid, session = {}, callback = noop)
		{
			try
			{
				const sql =
				    'INSERT INTO sessions (session_id, expires, data) VALUES ? ' +
				    'ON DUPLICATE KEY UPDATE expires=VALUES(expires), data=VALUES(data)';
				const expires = (session.cookie && session.cookie.expires) ?
                    Math.ceil(session.cookie.expires / 1000) :
                    mysql.raw(`UNIX_TIMESTAMP() + ${this.expirationInterval}`);
				const data = JSON.stringify(session);
				const params  = [[sid, expires, data]];
				await query(sql, [params]);

				callback(null);
			}
			catch (e)
			{
				console.log({func: 'set', e});
				callback(e);
			}
		}
		async destroy(sid, callback = noop)
		{
			try
			{
				const sql    = 'DELETE FROM sessions WHERE ?';
				const params = {session_id: sid};
				await query(sql, [params]);
			}
			catch (e)
			{
				console.log({func: 'destroy', e});
				callback(e);
			}
		}
	}
	return MysqlStore;
};
