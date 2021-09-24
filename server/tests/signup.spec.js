const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../app');
const {expect} = chai;

chai.use(chaiHttp);

describe(
    'test user signup',
    function()
    {
	    it('should return error as it missing fields',
	       function(done)
	       {
		       chai.request(app)
		           .post('/api/v1/auth/signup')
		           .send({
			           username: 'user1',
			           firstName: '',
			           lastName: 'user1lastname',
			           password: '123456'
		           })
		           .end(function(err, res)
		                {
			                expect(res.status).to.be.equal(400);
			                expect(res.body).to.have.property('error').equal(
			                    'missing required fields');
			                done();
		                });
	       });
	    it('should return error as user already exist',
	       function(done)
	       {
		       chai.request(app)
		           .post('/api/v1/auth/signup')
		           .send({
			           username: 'cdcc',
			           firstName: 'cdccfirstname',
			           lastName: 'user1lastname',
			           password: '123456'
		           })
		           .end(function(err, res)
		                {
			                expect(res.status).to.be.equal(400);
			                expect(res.body).to.have.property('error').equal(
			                    'user already exist');
			                done();
		                });
	       });
    });
