const {getUserByUserName} = require('../../models/users');

async function userExist(req, res, next)
{
	const {username} = req.body;
	const tmpUser    = await getUserByUserName(username);
	if (tmpUser != false)
	{
		res.status(400).send({error: 'user already exist'});
		return;
	}
	next();
}

module.exports = userExist;
