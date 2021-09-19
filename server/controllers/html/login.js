const {getSession, setSession} = require('../../models/users');
let loginError                 = false;

function getLogin(req, res)
{
	res.render('login', {error: loginError});
	loginError = false;
}

async function postLogin(req, res)
{
	try
	{
		if (req.authFailed)
		{
			loginError = req.authFailed.error;
			res.status(req.authFailed.code).redirect(301, '/login');
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

module.exports = {
	getLogin,
	postLogin
};
