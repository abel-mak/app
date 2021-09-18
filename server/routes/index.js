const indexRouter = require('./api/v1/');
const htmlRouter  = require('./html/');
const express     = require('express');
const router      = express.Router();

router.use('/api/v1/', indexRouter);
router.use("/", htmlRouter);
router.get(
    '/',
    (req, res) =>
    {
	    res.status(200).send('hello world');
    });

module.exports = router;
