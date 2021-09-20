const {add} = require('../../models/users');

async function signUp(req, res)
{
	try
	{
		if (req.error)
		{
			res.status(400).send({error: req.error});
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
