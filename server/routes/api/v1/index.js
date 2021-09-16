const userRouter    = require('./user');
const articleRouter = require('./article');
const router        = require('express').Router();

router.use('/auth', userRouter);
router.use('/article', articleRouter);

module.exports = router;
