const {getArticles, addArticle, getArticleById} =
    require('../../models/article');

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
		res.render('article/article', {data, user, error: req.flash('error')});
	}
	catch (e)
	{
		console.log('articles failed' + e);
		res.status(500).render('error', {error: '5xx internal error'});
	}
}

async function articleById(req, res)
{
	try
	{
		const error = req.error;
		const id    = req.id;
		if (error || !id)
		{
			res.status(404).render('404');
			return;
		}
		const row = await getArticleById(id);

		if (row != false)
		{
			const {title, body} = row[0];
			res.render(
			    'article/articleById',
			    {title, body, error: req.flash('error')});
		}
		else
		{
			res.status(404).render('404');
		}
	}
	catch (e)
	{
		console.log('articleById failed ' + e);
		res.status(500);
	}
}

async function getCreate(req, res)
{
	try
	{
		const error = req.error;

		if (error)
		{
			if (error.code == 401)
			{
				req.flash('error', error.message);
				res.redirect(302, '/auth/login');
			}
			else
				throw new Error(error);
		}
		else
			res.render('article/create', {error: req.flash('error')});
	}
	catch (e)
	{
		console.log('getCreate failed ' + e);
		res.status(500);
	}
}

async function postCreate(req, res)
{
	try
	{
		const error = req.error;
		if (error)
		{
			req.flash('error', error.message);
			res.redirect(302, '/article/create');
			return;
		}
		const {id}          = req.user;
		const {title, body} = req.body;
		const queryRes      = await addArticle(title, body, id);
		const insertId      = queryRes.insertId;

		// TODO redirect to created article
		console.log('inserted articel ' + insertId);
		res.redirect(302, '/article');
	}
	catch (e)
	{
		console.log('postArticle failed ' + e);
		res.status(500);
	}
}

async function getEdit(req, res)
{
	try
	{
		const id  = req.query.id;
		const row = await getArticleById(id);

		if (row != false)
		{
			const {title, body} = row[0];
			res.render(
			    'article/edit', {error: req.flash('error'), title, body});
		}
		else
		{
			res.status(404).send('not found');
		}
	}
	catch (e)
	{
		console.log('getEdit failed ' + e);
		res.status(500);
	}
}

module.exports = {
	articles,
	getCreate,
	postCreate,
	articleById,
	getEdit
};
