
async function valideArticleById(req, res, next)
{
	const {id} = req.params;
	if (id && !isNaN(id))
		req.id = id;
	else
		req.error = {code: 404, message:"not found"};
	next();
}

module.exports = valideArticleById;
