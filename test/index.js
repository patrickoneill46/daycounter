var daycounter = require('../index');
var expect = require('chai').expect;


describe('Daycounter tests', function() {

	it('should load the module', function() {

		expect(daycounter).to.have.property('actual');
		expect(daycounter).to.have.property('thirtyThreeSixty');

	});


});

