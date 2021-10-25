const {
	getArticles,
	addArticle,
	getArticleById,
	updateArticle,
	upvote,
	downvote,
	voteStatus,
	addComment,
	getComment
} = require('../../models/article');

async function articles(req, res)
{
	try
	{
		const user_id = req.session.user_id;
		const rows    = await getArticles(user_id);
		const data    = [];
		const user    = req.user;


		rows.forEach(e => {
			const {id, title, body, vote, user_vote} = e;
			data.push({id, title, body, vote, user_vote});
		});
		res.render('article/article', {
			data,
			user,
			error: req.flash('error'),
			success: req.flash('success')
		});
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
		if (error && error.code == 404)
		{
			res.status(error.code).render('404');
			return;
		}
		const id       = req.id;
		const row      = await getArticleById(id);
		const comments = await getComment(id);

		if (row != false)
		{
			const {title, body, id} = row[0];
			res.render('article/articleById', {
				user: req.user,
				title,
				body,
				id,
				comments,
				error: req.flash('error'),
				success: req.flash('success')
			});
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
			res.render('article/create', {
				error: req.flash('error'),
				success: req.flash('success'),
				user: req.user
			});
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
		const error = req.error;
		if (error)
		{
			req.flash('error', error.message);
			res.redirect(302, '/article');
			return;
		}
		const id  = req.id;
		const row = await getArticleById(id);

		if (row != false)
		{
			const {title, body} = row[0];
			res.render('article/edit', {
				error: req.flash('error'),
				title,
				body,
				success: req.flash('success')
			});
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

async function postEdit(req, res)
{
	try
	{
		const error = req.error;
		if (error)
		{
			req.flash('error', error.message);
			res.redirect(302, '/article');
			return;
		}
		const id            = req.id;
		const {title, body} = req.body;
		const row           = await updateArticle(id, title, body);

		req.flash('success', 'edited successfuly');
		res.redirect(302, '/article/id=' + id);
	}
	catch (e)
	{
		console.log('getEdit failed ' + e);
		res.status(500);
	}
}

async function articleUpvote(req, res)
{
	try
	{
		const error = req.error;
		if (error)
		{
			req.flash('error', error.message);
			res.status(error.code).send(error.message);
			return;
		}
		const article_id             = req.id;
		const user_id                = req.session.user_id;
		const row                    = await upvote(article_id, user_id);
		const status                 = await voteStatus(article_id, user_id);
		const {user_vote, all_votes} = status[0];

		res.json({
			error: null,
			message: 'upvoted successfuly',
			user_vote,
			all_votes
		});
	}
	catch (e)
	{
		console.log('articleUpvote failed' + e);
		res.status(500);
	}
}

async function articleDownvote(req, res)
{
	try
	{
		const error = req.error;
		if (error)
		{
			req.flash('error', error.message);
			res.status(error.code).send(error.message);
			return;
		}
		const article_id             = req.id;
		const user_id                = req.session.user_id;
		const row                    = await downvote(article_id, user_id);
		const status                 = await voteStatus(article_id, user_id);
		const {user_vote, all_votes} = status[0];

		res.json({
			error: null,
			message: 'downvoted successfuly',
			user_vote,
			all_votes
		});
	}
	catch (e)
	{
		console.log('articleDownvote failed' + e);
		res.status(500);
	}
}

async function postComment(req, res)
{
	try
	{
		const error = req.error;
		if (error)
		{
			req.flash('error', error.message);
			res.redirect(302, '/article');
			return;
		}
		const article_id = req.id;
		const author     = req.session.user_id;
		const content    = req.content;
		const reply_to   = null;
		const row = await addComment(article_id, author, content, reply_to);

		res.redirect(302, `/article/id=${article_id}`);
	}
	catch (e)
	{
	}
}

module.exports = {
	articles,
	getCreate,
	postCreate,
	articleById,
	getEdit,
	postEdit,
	articleUpvote,
	articleDownvote,
	postComment
};
