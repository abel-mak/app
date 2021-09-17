const {getUserByUserName} = require('../models/users');

async function auth(req, res, next)
{
	try
	{
		const {username, password} = req.body;
		const tmpUser              = await getUserByUserName(username);
		const user                 = tmpUser == false ? undefined : tmpUser[0];

		// console.log(user, password);
		if (!user)
		{
			res.status(404).send({error: 'user not found'});
			return;
		}
		else if (user && password != user.password)
		{
			res.status(401).send({error: 'wrong password'});
			return;
		}
		const {firstName, lastName, id} = user;
		req.user                        = {username, firstName, lastName, id};
		next();
	}
	catch (e)
	{
		console.log('auth failed ' + e);
	}
}

module.exports = {auth};
