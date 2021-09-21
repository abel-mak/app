const router     = require('express').Router();
const {articles} = require('../../controllers/html/article');
const isLoggedIn = require("../../middleswares/isLoggedIn");

router.get('/', isLoggedIn, articles);

module.exports = router;
