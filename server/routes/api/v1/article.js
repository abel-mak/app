const {createArticle, articles, editArticle} =
    require('../../../controllers/api/article');
const isLoggedIn    = require('../../../middleswares/isLoggedIn');
const permission    = require('../../../middleswares/permission');
const express       = require('express');
const articleRouter = express.Router();
const validCreateArticle =
    require('../../../middleswares/validations/validCreateArticle.js');

articleRouter.post('/create', validCreateArticle, isLoggedIn, createArticle);
articleRouter.post('/edit', isLoggedIn, permission, editArticle);
articleRouter.get('/', articles);

module.exports = articleRouter;
