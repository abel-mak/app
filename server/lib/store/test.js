const session    = require('express-session');
const MysqlStore = require('.')(session);
const express    = require('express');
const flash      = require('express-flash');

const app = express();


app.use(session({
	//	store: new MysqlStore(),
	secret: 'this is a secret',
	name: '22',
	cookie: {maxAge: 60000},
	resave: false,
	saveUninitialized: false
}));

app.use(flash());


app.get(
    '/',
    function(req, res)
    {
	    req.flash('message', 'this is message from');
	    res.redirect(302, '/contact');
    });
app.get(
    '/contact',
    function(req, res)
    {
	    const message = req.flash('message');
	    console.log(message);
	    res.send({message});
    });
app.listen(8080);
