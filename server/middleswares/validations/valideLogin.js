function valideLogin(req, res, next)
{
	const {username, password} = req.body;
	let error                  = undefined;

	if ((typeof username != 'string' || typeof password != 'string') ||
	    username.length == 0 || password.length == 0)
	{
		req.error = {code: 400, message: 'missing required fields'};
		// res.status(400).send({error: 'missing required fields'});
	}
	next();
}

module.exports = valideLogin;
