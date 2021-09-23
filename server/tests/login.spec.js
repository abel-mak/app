const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../app');
const {expect} = chai;

chai.use(chaiHttp);

describe(
    'user login',
    function()
    {
	    it('should return error as user doesn\'t exist',
	       function(done)
	       {
		       chai.request(app)
		           .post('/api/v1/auth/login')
		           .send({username: 'test88', password: '123456'})
		           .end(function(err, res)
		                {
			                expect(res.status).to.be.equal(404);
			                expect(res.body).to.have.property('error').equal(
			                    'user not found');
			                done();
		                });
	       });
	    it('should return error as password is missing',
	       function(done)
	       {
		       chai.request(app)
		           .post('/api/v1/auth/login')
		           .send({username: 'cdcc'})
		           .end(function(err, res)
		                {
			                expect(res.status).to.be.equal(400);
			                expect(res.body).to.have.property('error').equal(
			                    'missing required fields');
			                done();
		                });
	       });
	    it('should return error as body is empty',
	       function(done)
	       {
		       chai.request(app)
		           .post('/api/v1/auth/login')
		           .send({})
		           .end(function(err, res)
		                {
			                expect(res.status).to.be.equal(400);
			                expect(res.body).to.have.property('error').equal(
			                    'missing required fields');
			                done();
		                });
	       });
	    it('should return error as password is incorrect',
	       function(done)
	       {
		       chai.request(app)
		           .post('/api/v1/auth/login')
		           .send({username: 'cdcc', password: 'xxxxxxx'})
		           .end(function(err, res)
		                {
			                expect(res.status).to.be.equal(401);
			                expect(res.body).to.have.property('error').equal(
			                    'wrong password');
			                done();
		                });
	       });
    });
