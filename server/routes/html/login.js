const router                = require('express').Router();
const {getLogin, postLogin} = require('../../controllers/html/login');
const {auth}                  = require('../../middleswares/auth');
router.get('/', getLogin);
router.post('/', auth, postLogin);

module.exports = router;
