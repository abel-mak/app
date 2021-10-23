function valideComment(req, res, next)
{
	const error = req.error;
	if (error)
	{
		next();
		return;
	}
	const id      = parseInt(req.body.id);
	const content = req.body.content;
	if (id && content && content.trim().length != 0 && !isNaN(id))
	{
		req.id      = id;
		req.content = content;
	}
	else
	{
		req.error = {code: 400, message: 'invalid input'};
	}
	next();
}

module.exports = valideComment;
