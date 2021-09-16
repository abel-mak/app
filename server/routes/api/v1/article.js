const {createArticle, articles} = require('../../../controllers/article');
const isLoggedIn      = require('../../../middleswares/isLoggedIn');
const express         = require('express');
const articleRouter   = express.Router();

articleRouter.post('/create', isLoggedIn, createArticle);
articleRouter.get('/', articles);
module.exports = articleRouter;
