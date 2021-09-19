const router      = require('express').Router();
const {getSignup} = require('../../controllers/html/signup');

router.get('/', getSignup);

module.exports = router;
