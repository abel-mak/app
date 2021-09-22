const userRouter = require('express').Router();
const {getSignup, postSignup, getLogin, postLogin, postLogout} =
    require('../../controllers/html/user');
const {auth}      = require('../../middleswares/auth');
const valideLogin = require('../../middleswares/validations/valideLogin');
const isLoggedIn  = require('../../middleswares/isLoggedIn');

userRouter.get('/signup', getSignup);
userRouter.post('/signup', postSignup);
userRouter.get('/login', getLogin);
userRouter.post('/login', valideLogin, auth, postLogin);
userRouter.post('/logout', isLoggedIn, postLogout);

module.exports = userRouter;
