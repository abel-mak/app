const {add} = require('../../models/users');

async function signUp(req, res)
{
	try
	{
		const error = req.error;
		if (error)
		{
			res.status(error.code).send({error: error.message});
			return;
		}
		const {firstName, lastName, username, password} = req.body;
		const user = await add(firstName, lastName, username, password);

		res.status(200).send({message: 'user created successfully'});
	}
	catch (e)
	{
		console.log('signup failed' + e);
		res.status(500);
	}
}

module.exports = signUp;
