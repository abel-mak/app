const {getUserByUserName} = require('../models/users');

async function checkUsername(req)
{
	const {username, password} = req.body;
	const tmpUser              = await getUserByUserName(username);
	const user                 = tmpUser == false ? undefined : tmpUser[0];
	let error                  = undefined;
	// console.log(user, password);
	if (!user)
	{
		error         = {};
		error.message = 'user not found';
		error.code    = 404;
		return {error};
	}
	else if (user && password != user.password)
	{
		error         = {};
		error.message = 'wrong password';
		error.code    = 401;
		return {error};
	}
	return {user, error};
}

module.exports = {checkUsername};
