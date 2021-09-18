const {getSession, setSession} = require('../../models/users');

async function login(req, res)
{
	try
	{
		if (req.check)
		{
			res.status(req.check.code).send({error: req.check.error});
			return;
		}
		const {id} = req.user;
		const tmp  = await setSession(id);
		const row  = await getSession(id);

		// console.log(req.user);
		res.cookie('sessionId', row[0].sessionId);
		res.status(200).send({sessionId: row[0].sessionId});
	}
	catch (e)
	{
		console.log('login failed: ' + e);
	}
}

module.exports = login;
