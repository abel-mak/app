function validCreateArticle(req, res, next)
{
	const {title, body} = req.body;

	if (!title || !body || title.length == 0 || body.length == 0)
	{
		req.error = {code: 400, message: 'missing required fields'};
	}
	next();
}

module.exports = validCreateArticle;
