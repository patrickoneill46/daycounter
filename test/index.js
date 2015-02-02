var daycounter = require('../index');
var expect = require('chai').expect,
	fs = require('fs');


describe('Daycounter tests', function() {

	var investmentDates;

	before(function(done){
		fs.readFile('test/data/dates.json', function(err, data){

			if(err){
				console.error(err);
			}

			investmentDates = JSON.parse(data);
			done();
		});
	});

	it('should load the module', function() {

		expect(daycounter).to.have.property('actual');
		expect(daycounter).to.have.property('thirtyThreeSixty');

	});


});

