const {getUserById} = require('../models/users');

async function isLoggedIn(req, res, next)
{
	try
	{
		const user_id = req.session.user_id;
		if (!user_id)
		{
			req.error = {code: 401, message: 'Unauthorized'};
			// res.status(401).send({error: 'Unauthorized'});
			next();
			return;
		}
		const row = await getUserById(user_id);

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
