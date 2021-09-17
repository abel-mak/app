const {add, remove, setSession, getSession} = require("../../models/users");

async function signUp(req, res)
{
	try
	{
		const {firstName, lastName, username, password} = req.body;

		console.log(req.body.firstName);
		const user = await add(firstName, lastName, username, password); 
		const id = user.insertId;
		const tmp = await setSession(id);
		const row = await getSession(id);
		
		res.status(200).send({sessionId: row[0].sessionId});
		console.log(row);
		return res;
	}
	catch(e)
	{
		console.log("signup failed" + e);
	}
}

module.exports = signUp;
