const {getArticleById} = require('../models/article');

async function permission(req, res, next)
{
	try
	{
		const error = req.error;
		if (error)
		{
			next();
			return;
		}
		const user_id = req.user.id;
		const id    = req.body.id || req.id;
		const row     = await getArticleById(id);

		if (row == false)
		{
			req.error = {code: 404, message: 'no article by this id'};
			next();
			// res.status(404).send({error: 'no article by this id'});
			return;
		}
		if (row[0] && row[0].user_id == user_id)
			next();
		else
		{
			req.error = {code: 401, message: 'permisson needed'};
			// res.status(401).send({error: 'permisson needed'});
			next();
		}
	}
	catch (e)
	{
		console.log('permission failed ' + e);
		res.status(500);
	}
}

module.exports = permission;
