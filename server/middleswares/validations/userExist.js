const {getUserByUserName} = require('../../models/users');

async function userExist(req, res, next)
{
	if (req.error)
	{
		next();
		return;
	}
	const {username} = req.body;
	const tmpUser    = await getUserByUserName(username);
	if (tmpUser != false)
	{
		req.error = {code: 400, message: 'user already exist'};
		// res.status(400).send({error: 'user already exist'});
		// return;
	}
	next();
}

module.exports = userExist;
