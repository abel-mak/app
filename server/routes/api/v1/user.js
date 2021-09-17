const signUp       = require('../../../controllers/api/signup');
const login        = require('../../../controllers/api/login');
const logout       = require('../../../controllers/api/logout');
const {auth}       = require('../../../middleswares/auth');
const valideLogin  = require('../../../middleswares/validations/valideLogin');
const valideSignup = require('../../../middleswares/validations/valideSignup');
const userExist    = require('../../../middleswares/validations/userExist');
const isLoggedIn   = require('../../../middleswares/isLoggedIn');
const express      = require('express');
const userRouter   = express.Router();


userRouter.post('/signup', valideSignup, userExist, signUp);
userRouter.post('/login', valideLogin, auth, login);
userRouter.post('/logout', isLoggedIn, logout);

module.exports = userRouter;
