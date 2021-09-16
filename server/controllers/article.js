const {addArticle, getArticles} = require('../models/article');

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

async function articles(req, res)
{
	try
	{
		const rows = await getArticles();
		const data = [];

		rows.forEach(
		    (e) =>
		    {
			    const {id, title, body} = e;

			    data.push({id, title, body});
		    });
		res.status(200).send({data});
		// console.log(rows);
	}
	catch (e)
	{
		console.log("articles failed " + e);
		/* handle error */
	}
}

module.exports = {
	createArticle,
	articles
};
