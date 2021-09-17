const {destroySession} = require('../../models/users');

//TODO: logout by sessionId not by username

async function logout(req, res)
{
	try
	{
		const {username} = req.body;

		await destroySession(username);
		res.status(200).send({message: 'successfuly logged out'});
	}
	catch (e)
	{
	}
}

module.exports = logout;