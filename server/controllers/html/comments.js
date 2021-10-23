const {addComment} = require('../../models/article');

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
		const content    = req.body.content;
		const reply_to   = null;
		const row = await addComment(article_id, author, content, reply_to);

		res.redirect(302, `/article/id=${article_id}`);
	}
	catch (e)
	{
	}
}

module.exports = {postComment};
