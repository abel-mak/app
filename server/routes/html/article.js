const router     = require('express').Router();
const {articles, getCreate} = require('../../controllers/html/article');
const isLoggedIn = require('../../middleswares/isLoggedIn');

router.get('/', isLoggedIn, articles);
router.get('/create', getCreate);

module.exports = router;
