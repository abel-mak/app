const router = require('express').Router();
const {
	articles,
	getCreate,
	postCreate,
	articleById,
	getEdit,
	postEdit,
	articleUpvote,
	articleDownvote,
	postComment
}                = require('../../controllers/html/article');
const isLoggedIn = require('../../middleswares/isLoggedIn');
const valideArticleById =
    require('../../middleswares/validations/valideArticleById');
const permission    = require('../../middleswares/permission');
const valideComment = require('../../middleswares/validations/valideComment');

router.get('/', isLoggedIn, articles);
router.get('/id=:id', isLoggedIn, valideArticleById, articleById);
router.get('/create', isLoggedIn, getCreate);
router.post('/create', isLoggedIn, postCreate);
router.get('/id=:id/edit', valideArticleById, getEdit);
router.post(
    '/id=:id/edit', isLoggedIn, valideArticleById, permission, postEdit);
router.post('/id=:id/upvote', isLoggedIn, valideArticleById, articleUpvote);
router.post('/id=:id/downvote', isLoggedIn, valideArticleById, articleDownvote);
router.post('/comment', isLoggedIn, valideComment , postComment);

module.exports = router;
