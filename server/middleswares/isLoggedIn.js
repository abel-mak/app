const {getUserBySessionId, isValidSession} = require('../models/users');

async function isLoggedIn(req, res, next)
{
	try
	{
		const sessionId = req.cookies.sessionId;
		const row       = await getUserBySessionId(sessionId);

		if (row == false)
		{
			req.error = {code: 401, message: 'Unauthorized'};
			// res.status(401).send({error: 'Unauthorized'});
			next();
			return;
		}
		const isValid = await isValidSession(sessionId);
		if (isValid == false || isValid.result == false)
		{
			req.error = {code: 401, message: 'Unauthorized'};
			// res.status(401).send({error: 'Unauthorized'});
			next();
			return;
		}
		const {id, firstName, lastName, username} = row[0];
		req.user = {id, firstName, lastName, username};
		next();
	}
	catch (e)
	{
		console.log('isLoggedIn failed ' + e);
		// res.status(500).send({error: 'internal error'});
		req.error = {code: 500, message: 'internal error'};
		next();
	}
}

module.exports = isLoggedIn;
