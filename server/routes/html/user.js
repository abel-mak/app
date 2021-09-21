const userRouter = require('express').Router();
const {getSignup, postSignup, getLogin, postLogin} =
    require('../../controllers/html/user');
const {auth}      = require('../../middleswares/auth');
const valideLogin = require('../../middleswares/validations/valideLogin');

userRouter.get('/signup', getSignup);
userRouter.post('/signup', postSignup);
userRouter.get('/login', getLogin);
userRouter.post('/login', valideLogin, auth, postLogin);

module.exports = userRouter;
