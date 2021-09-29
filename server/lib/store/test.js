const session    = require('express-session');
const MysqlStore = require('.')(session);
const express    = require('express');
const chai       = require('chai');
const chaiHttp   = require('chai-http');

chai.use(chaiHttp);

const app = express();

app.use(session({
	store: new MysqlStore(),
	secret: 'secret',
	name: 'test',
	cookie: {maxAge: 60000},
	unset: 'destroy',
	resave: true,
	saveUninitialized: false
}));

app.get(
    '/',
    function(req, res)
    {
	    try
	    {
		    if (req.session.views)
		    {
			    req.session.views++;
			    res.setHeader('Content-Type', 'application/json');
			    console.log(req.session.cookie.maxAge);
			    res.send({
				    views: req.session.views,
				    expires: `${(req.session.cookie.maxAge) / 1000}'s`
				});
		    }
		    else
		    {
			    req.session.views = 1;
			    res.send({message: 'welcome to the session demo. refresh!'});
		    }
	    }
	    catch (e)
	    {
		    console.log(e);
	    }
    });

app.listen(8080);
