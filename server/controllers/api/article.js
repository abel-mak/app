const {addArticle, getArticles, updateArticle} =
    require('../../models/article');

async function createArticle(req, res)
{
	try
	{
		const error = req.error;
		if (error)
		{
			res.status(error.code).send({error: error.message});
			return;
		}
		const {id}          = req.user;
		const {title, body} = req.body;
		const queryRes      = await addArticle(title, body, id);
		const insertId      = queryRes.insertId;

		//	console.log(id);
		// console.log(queryRes);
		res.status(200).send({articleId: insertId});
	}
	catch (e)
	{
		console.log('createArticle failed' + e);
		res.status(500).send({error: 'internal error'});
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
		console.log('articles failed ' + e);
		res.status(500).send({error: 'internal error'});
		/* handle error */
	}
}

async function editArticle(req, res)
{
	try
	{
		const error = req.error;
		if (error)
		{
			res.status(error.code).send({error: error.message});
			return;
		}
		const {id, title, body} = req.body;
		const row               = await updateArticle(id, title, body);

		// console.log(row);
		res.status(200).send({message: 'edited succesfuly'});
	}
	catch (e)
	{
		console.log('editArticle failed ' + e);
		res.status(500).send({error: 'internal error'});
	}
}

module.exports = {
	createArticle,
	articles,
	editArticle
};
