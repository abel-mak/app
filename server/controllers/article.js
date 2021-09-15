const {addArticle} = require('../models/article');

async function createArticle(req, res)
{
	try
	{
		const {id}          = req.user;
		const {title, body} = req.body;
		const queryRes      = await addArticle(title, body, id);
		const insertId      = queryRes.insertId;

		//	console.log(id);
		console.log(queryRes);
		res.status(200).send({articleId: insertId});
	}
	catch (e)
	{
		console.log('createArticle failed' + e);
	}
}

module.exports = {createArticle};
