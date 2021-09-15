function valideLogin(req, res, next)
{
	const {username, password} = req.body;

	if ((typeof username != 'string' || typeof password != 'string') ||
	    username.length == 0 || password.length == 0)
	{
		res.status(400).send({error: 'missing required fields'});
		return;
	}
	next();
}

module.exports = valideLogin;
