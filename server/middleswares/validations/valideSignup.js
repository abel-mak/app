function valideSignup(req, res, next)
{
	const {firstName, lastName, username, password} = req.body;

	if (typeof firstName != 'string' || typeof password != 'string' ||
	    typeof lastName != 'string' || typeof username != 'string' ||
	    firstName.length == 0 || password.length == 0 || lastName.length == 0 ||
	    username.length == 0)
	{
		req.error = {code:400, message: 'missing required fields'};
		// res.status(400).send({error: 'missing required fields'});
		// return;
	}
	next();
}

module.exports = valideSignup;
