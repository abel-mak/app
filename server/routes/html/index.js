const router  = require('express').Router();
const article = require('./article');
const login   = require('./login');
const signup  = require('./signup');

router.use('/article', article);
router.use('/login', login);
router.use('/signup', signup);

module.exports = router;
