let signupError = false;

function getSignup(req, res)
{
	res.render('signup', {error: signupError});
	signupError = false;
}

module.exports = {getSignup};
