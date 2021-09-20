const router     = require('express').Router();
const article    = require('./article');
const userRouter = require('./user');

router.use('/article', article);
router.use('/', userRouter);

module.exports = router;
