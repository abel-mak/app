const router     = require('express').Router();
const {articles} = require('../../controllers/html/article');

router.get('/article', articles);

module.exports = router;
