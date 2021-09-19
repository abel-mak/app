const {checkUsername} = require('../utils/user');

// if error set authFailed variable in request
// else set user variable in request

async function auth(req, res, next)
{
	try
	{
		const check = await checkUsername(req);

		if (check.error)
		{
			req.authFailed = check;
			next();
			return;
		}
		const {id, username, firstName, lastName} = check.user;
		req.user = {username, firstName, lastName, id};
		next();
	}
	catch (e)
	{
		console.log('auth failed ' + e);
	}
}

module.exports = {auth};
