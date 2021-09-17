const {createArticle, articles, editArticle} =
    require('../../../controllers/api/article');
const isLoggedIn    = require('../../../middleswares/isLoggedIn');
const permission = require("../../../middleswares/permission");
const express       = require('express');
const articleRouter = express.Router();

articleRouter.post('/create', isLoggedIn, createArticle);
articleRouter.post('/edit', isLoggedIn, permission, editArticle);
articleRouter.get('/', articles);
module.exports = articleRouter;
