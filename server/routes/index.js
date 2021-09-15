const indexRouter = require('./v1');
const express     = require('express');
const router      = express.Router();

router.use('/api/v1/', indexRouter);
router.get(
    '/',
    (req, res) =>
    {
	    res.status(200).send('hello world');
    });

module.exports = router;
