const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../../app');
const {expect} = chai;

chai.use(chaiHttp);

describe(
    'test user login',
    function()
    {
	    it('should redirect to login because user doesn\'t exist',
	       function(done)
	       {
		       chai.request(app)
		           .post('/auth/login')
		           .send({username: 'test88', password: '123456'})
		           .end(function(err, res)
		                {
			                expect(res).to.redirectTo(/(auth\/login)$/);
			                done();
		                });
	       });
	    it('should redirect to login as password is missing',
	       function(done)
	       {
		       chai.request(app)
		           .post('/auth/login')
		           .send({username: 'cdcc'})
		           .end(function(err, res)
		                {
			                expect(res).to.redirectTo(/(auth\/login)$/);
			                done();
		                });
	       });
	    it('should redirect to login as body is empty',
	       function(done)
	       {
		       chai.request(app)
		           .post('/auth/login')
		           .send({})
		           .end(function(err, res)
		                {
			                expect(res).to.redirectTo(/(auth\/login)$/);
			                done();
		                });
	       });
	    it('should redirect to login as password is incorrect',
	       function(done)
	       {
		       chai.request(app)
		           .post('/auth/login')
		           .send({username: 'cdcc', password: 'xxxxxxx'})
		           .end(function(err, res)
		                {
			                expect(res).to.redirectTo(/(auth\/login)$/);
			                done();
		                });
	       });
    });
