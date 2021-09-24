const {getArticles} = require('../../models/article');

async function articles(req, res)
{
	try
	{
		const rows = await getArticles();
		const data = [];
		const user = req.user;

		rows.forEach(
		    e =>
		    {
			    const {id, title, body} = e;
			    data.push({id, title, body});
		    });
		res.render('article/article', {data, user});
	}
	catch (e)
	{
		console.log('articles failed' + e);
		res.status(500).render('error', {error: '5xx internal error'});
	}
}

async function getCreate(req, res)
{
	res.render('article/create');
}

module.exports = {
	articles,
	getCreate
};
