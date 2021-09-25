const router = require('express').Router();
const {articles, getCreate, postCreate, articleById} =
    require('../../controllers/html/article');
const isLoggedIn = require('../../middleswares/isLoggedIn');
const valideArticleById =
    require('../../middleswares/validations/valideArticleById');

router.get('/', isLoggedIn, articles);
router.get('/id=:id', valideArticleById, articleById);
router.get('/create', isLoggedIn, getCreate);
router.post('/create', isLoggedIn, postCreate);
module.exports = router;
