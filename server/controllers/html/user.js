const {add, getSession, setSession, destroySession} =
    require('../../models/users');

function getLogin(req, res)
{
	res.render('user/login', {error: req.flash('error')});
}

async function postLogin(req, res)
{
	try
	{
		if (req.error)
		{
			req.flash('error', req.error.message);
			res.status(req.error.code).redirect(301, '/auth/login');
			return;
		}
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
	res.render('user/signup', {error: req.flash('error')});
}

async function postSignup(req, res)
{
	try
	{
		const error = req.error;

		if (error)
		{
			req.flash('error', error.message);
			res.redirect(301, '/auth/signup');
			return;
		}
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

async function postLogout(req, res)
{
	try
	{
		const error = req.error;
		if (error)
		{
			throw new Error(error.message);
		}
		const {sessionId} = req.cookies;

		await destroySession(sessionId);
		res.redirect(301, '/article');
	}
	catch (e)
	{
		console.log('postLogout failed ' + e);
		res.status(500);
	}
}

module.exports = {
	getSignup,
	postSignup,
	getLogin,
	postLogin,
	postLogout
};
