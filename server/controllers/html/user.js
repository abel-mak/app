const {add}                    = require('../../models/users');
const {getSession, setSession} = require('../../models/users');
let loginError                 = false;
let signupError                = false;

function getLogin(req, res)
{
	res.render('login', {error: loginError});
	loginError = false;
}

async function postLogin(req, res)
{
	try
	{
		if (req.error)
		{
			loginError = req.error.message;
			res.status(req.error.code).redirect(301, '/login');
			return;
		}
		console.log(req.user);
		const {id} = req.user;
		const tmp  = await setSession(id);
		const row  = await getSession(id);

		res.cookie('sessionId', row[0].sessionId).redirect(301, '/article');
	}
	catch (e)
	{
		console.log('postLogin failed ' + e);
		res.status(500);
	}
}

function getSignup(req, res)
{
	res.render('signup', {error: signupError});
	signupError = false;
}

async function postSignup(req, res)
{
	if (req.error)
	{
		signupError = req.error;
		res.redirect(301, '/signup');
		return;
	}
	try
	{
		const {firstName, lastName, username, password} = req.body;
		const user = await add(firstName, lastName, username, password);

		res.redirect(301, '/login');
	}
	catch (e)
	{
		console.log('postSignup failed ' + e);
		res.status(500);
	}
}

module.exports = {
	getSignup,
	postSignup,
	getLogin,
	postLogin
};