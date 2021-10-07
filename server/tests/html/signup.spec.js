const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../../app');
const {expect} = chai;

chai.use(chaiHttp);

describe(
    'html test user signup',
    function()
    {
	    it('should redirect to signup as it missing fields',
	       function(done)
	       {
		       chai.request(app)
		           .post('/auth/signup')
		           .send({
			           username: 'user1',
			           firstName: '',
			           lastName: 'user1lastname',
			           password: '123456'
		           })
		           .end(function(err, res)
		                {
			                expect(res).to.redirectTo(/(auth\/signup)$/);
			                done();
		                });
	       });
	    it('should redirect to signup as user already exist',
	       function(done)
	       {
		       chai.request(app)
		           .post('/auth/signup')
		           .send({
			           username: 'cdcc',
			           firstName: 'cdccfirstname',
			           lastName: 'user1lastname',
			           password: '123456'
		           })
		           .end(function(err, res)
		                {
			                expect(res).to.redirectTo(/(auth\/signup)$/);
			                done();
		                });
	       });
    });
