
async function valideArticleById(req, res, next)
{
	const {id} = req.params;
	if (id && !isNaN(id))
		req.id = id;
	next();
}

module.exports = valideArticleById;
