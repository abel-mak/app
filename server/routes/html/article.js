const router     = require('express').Router();
const {articles} = require('../../controllers/html/article');

router.get('/', articles);

module.exports = router;
