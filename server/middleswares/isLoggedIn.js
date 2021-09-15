const {getUserBySessionId, isValidSession} = require('../models/users');

async function isLoggedIn(req, res, next)
{
	try
	{
		const sessionId = req.cookies.sessionId;
		const row       = await getUserBySessionId(sessionId);

		if (row == false)
		{
			res.status(401).send({error: 'Unauthorized'});
			return;
		}
		const isValid = await isValidSession(sessionId);
		if (isValid == false || isValid.result == false)
		{
			res.status(401).send({error: 'Unauthorized'});
			return;
		}
		const {id, firstName, lastName, username} = row[0];
		req.user = {id, firstName, lastName, username};
		next();
	}
	catch (e)
	{
		console.log('isLoggedIn failed ' + e);
	}
}

module.exports = isLoggedIn;
