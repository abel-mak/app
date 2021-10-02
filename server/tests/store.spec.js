const session    = require('express-session');
const MysqlStore = require('../lib/store')(session);
const express    = require('express');
const chai       = require('chai');
const chaiHttp   = require('chai-http');
const {expect}   = chai;
const store      = new MysqlStore();
chai.use(chaiHttp);

function setExpire(ms)
{
	return new Date(Date.parse(new Date()) + ms);
}

describe(
    'test Mysqlstore set',
    function()
    {
	    it('should set new session',
	       function(done)
	       {
		       const sid = '0123456789';
		       const str = 'this is data';
		       store.set(
		           sid, {str, cookie: {expires: setExpire(60000)}},
		           async function(error)
		           {
			           expect(error).to.be.null;
			           store.get(
			               sid,
			               function(error, data)
			               {
				               expect(error).to.be.null;
				               expect(data).to.have.property('str').equal(str);
				               expect(data).to.have.property('cookie');
				               done();
			               });
		           });
	       });
	    it('should update session',
	       function(done)
	       {
		       const sid = '0123456789';
		       const str = 'this updated is data';
		       store.set(
		           sid, {str, cookie: {expires: setExpire(60000)}},
		           async function(error)
		           {
			           expect(error).to.be.null;
			           store.get(
			               sid,
			               function(error, data)
			               {
				               expect(error).to.be.null;
				               expect(data).to.have.property('str').equal(str);
				               expect(data).to.have.property('cookie');
				               done();
			               });
		           });
	       });
    });

describe(
    'test Mysqlstore destroy',
    function()
    {
	    it('should destroy session',
	       function(done)
	       {
		       const sid = '0123456789';
		       store.destroy(
		           sid,
		           async function(error)
		           {
			           expect(error).to.be.null;
			           store.get(
			               sid,
			               function(error, data)
			               {
				               expect(error).to.be.null;
				               expect(data).to.be.null;
				               done();
			               });
		           });
	       });
    });

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

 describe(
    'test lib/store',
    function()
    {
	    it('should send cookie',
	       function(done)
	       {
		       chai.request.agent(app).get('/').end(
		           function(err, res)
		           {
			           expect(res).to.have.cookie('test');
			           done();
		           });
	       });
    });
