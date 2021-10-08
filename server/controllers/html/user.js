const {add, getSession, setSession, destroySession} =
    require('../../models/users');

function getLogin(req, res)
{
	res.render(
	    'user/login',
	    {error: req.flash('error'), success: req.flash('success')});
}

async function postLogin(req, res)
{
	try
	{
		if (req.error)
		{
			req.flash('error', req.error.message);
			res.redirect(301, '/auth/login');
			return;
		}
		const {id} = req.user;
		// const tmp  = await setSession(id);
		// const row  = await getSession(id);

		req.flash('success', 'successfully logged.in');
		req.session.user_id = id;
		res.redirect(301, '/article');
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

		req.flash('success', 'successfully signed.up');
		res.redirect(301, '/auth/login');
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
		req.session.user_id = undefined;
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
