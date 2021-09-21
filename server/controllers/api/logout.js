const {destroySession} = require('../../models/users');

// TODO: logout by sessionId not by username

async function logout(req, res)
{
	try
	{
		const error      = req.error;
		if (error)
		{
			res.status(error.code).send({error: error.message});
			return;
		}
		const {username} = req.body;
		
		await destroySession(username);
		res.status(200).send({message: 'successfuly logged out'});
	}
	catch (e)
	{
		console.log("logout failed " + e);
		res.status(500).send({error: "internal error"});
	}
}

module.exports = logout;
