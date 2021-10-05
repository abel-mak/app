const {createArticle, articles, editArticle, articleById} =
    require('../../../controllers/api/article');
const isLoggedIn    = require('../../../middleswares/isLoggedIn');
const permission    = require('../../../middleswares/permission');
const express       = require('express');
const articleRouter = express.Router();
const validCreateArticle =
    require('../../../middleswares/validations/validCreateArticle.js');
const valideArticleById =
    require('../../../middleswares/validations/valideArticleById');

articleRouter.post('/create', validCreateArticle, isLoggedIn, createArticle);
articleRouter.post('/edit', isLoggedIn, permission, editArticle);
articleRouter.get('/', articles);
articleRouter.get('/id=:id', valideArticleById, articleById);

module.exports = articleRouter;
