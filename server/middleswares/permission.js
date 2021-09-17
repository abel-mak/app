const {getArticleUserId} = require('../models/article');

async function permission(req, res, next)
{
	try
	{
		const user_id = req.user.id;
		const {id}    = req.body;
		const row     = await getArticleUserId(id);

		if (row == false)
			res.status(404).send({error: 'no article by this id'});
		if (row[0] && row[0].user_id == user_id)
			next();
		else
			res.status(401).send({error: 'Unauthorized action'});
	}
	catch (e)
	{
		console.log('permission failed ' + e);
		res.status(500);
	}
}

module.exports = permission;
