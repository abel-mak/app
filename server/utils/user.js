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
		error = 'user not found';
		return {user, error, code: 404};
	}
	else if (user && password != user.password)
	{
		error = 'wrong password';
		return {user, error, code: 401};
	}
	return {user, error};
}

module.exports = {checkUsername};
