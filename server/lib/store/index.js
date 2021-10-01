const {query} = require('../../models/mysql');
const mysql   = require('mysql');
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
			this.event();
		}
		async event()
		{
			try
			{
				await query('SET GLOBAL event_scheduler = ON; ');
				const sql =
				    'CREATE EVENT IF NOT EXISTS remove_expired_session ' +
				    ' ON SCHEDULE EVERY 1 MINUTE ' +
				    ' DO ' +
				    ' DELETE FROM sessions WHERE expires < UNIX_TIMESTAMP()';
				await query(sql);
			}
			catch (e)
			{
				console.log(e);
			}
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
				console.log({func: 'get', e});
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
				const expirationInterval =
				    (session.cookie && session.cookie.expires) ?
                    this.getIntervalInSeconds(session.cookie.expires) :
                    this.expirationInterval;
				// console.log(this.expirationInterval);
				const expires =
				    mysql.raw(`UNIX_TIMESTAMP() + ${expirationInterval}`);
				const data   = JSON.stringify(session);
				const params = [[sid, expires, data]];
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

				callback(null);
			}
			catch (e)
			{
				console.log({func: 'destroy', e});
				callback(e);
			}
		}
		getIntervalInSeconds(date)
		{
			const res = (Date.parse(date) - Date.parse(new Date())) / 1000;
			return (res > 0) ? res : 0;
		}
		async touch(session_id, session = {}, callback = noop)
		{
			try
			{
				const sql = 'UPDATE sessions SET ? WHERE ?';
				const expirationInterval =
				    (session.cookie && session.cookie.expires) ?
                    this.getIntervalInSeconds(session.cookie.expires) :
                    this.expirationInterval;
				const expires =
				    mysql.raw(`UNIX_TIMESTAMP() + ${expirationInterval}`);
				const params = [{expires}, {session_id}];
				await query(sql, params);

				callback(null);
			}
			catch (e)
			{
				console.log({func: 'touch', e});
				callback(e);
			}
		}
	}
	return MysqlStore;
};
