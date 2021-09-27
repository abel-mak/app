const chai     = require('chai');
const chaiHttp = require('chai-http');
const app      = require('../app');
const {expect} = chai;

chai.use(chaiHttp);

describe(
    'test articles',
    function()
    {
	    it('should return array of articles',
	       function(done)
	       {
		       chai.request(app)
		           .get('/api/v1/article')
		           .end(function(err, res)
		                {
			                expect(res.status).to.be.equal(200);
			                expect(res.body)
			                    .to.be.have.property('data')
			                    .to.be.an('array');
			                done();
		                });
	       });
    });

