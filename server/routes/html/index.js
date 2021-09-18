const router  = require('express').Router();
const article = require('./article');
const login   = require('./login');

router.use('/article', article);
router.use('/login', login);

module.exports = router;
