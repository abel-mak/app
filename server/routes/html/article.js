const router        = require('express').Router();
const {getArticles} = require('../../models/article');

router.get(
    '/article',
    async (req, res) =>
    {
	    const rows = await getArticles();
	    const data = [];


	    rows.forEach(
	        e =>
	        {
		        const {id, title, body} = e;
		        data.push({id, title, body});
	        });
	    res.render('article', {data});
    });

module.exports = router;
