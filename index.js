//http://en.wikipedia.org/wiki/Day_count_convention
// var dateroller = require('dateroller');
var	moment = require('moment');

//d1 = start date for accrual of interest, aka 'to'
//d2 = date through which interest is being accrued, aka 'from'
//d3 = payment date of the coupon following d2. 

var d1,d2,d3;

function parseInputs(startDate, endDate, paymentDate, UK){

	d1 = moment(startDate);
	d2 = moment(endDate);
	d3 = moment(paymentDate);
}

function thirtyThreeSixty(startDate, endDate, paymentDate, method){

	parseInputs(startDate, endDate, paymentDate);

	var methods = {

	}

	var factor = (360 * (d2.year() - d1.year()) + 30 * (d2.month() - d1.month()) + (d2.date() - d1.date()))/360,
		couponFactor = (360 * (d3.year() - d1.year()) + 30 * (d3.month() - d1.month()) + (d3.date() - d1.date()))/360;

	return {
		factor: factor,
		couponFactor: couponFactor
	};

}

function actual(startDate, endDate, paymentDate, method){

	parseInputs(startDate, endDate, paymentDate);

	var freq = 1,
		method = method || 'fixed';

	var methods  = {
		icma: function() {

			return { 
				factor: (d2.diff(d1, 'days'))/(freq * d3.diff(d1, 'days')), 
				couponFactor: 1/freq
			};

		},
		//ToDo: isda act method
		// isda: function(){

		// },
		fixed: function (){

			return { 
				factor: (d2.diff(d1, 'days'))/365, 
				couponFactor:(d3.diff(d1, 'days'))/365
			};

		},
		threeSixty: function() {

			return { 
				factor: (d2.diff(d1, 'days'))/360, 
				couponFactor: (d3.diff(d1, 'days'))/360
			};
		}

	}

	var factor = (d2.diff(d1, 'days'))/(freq * d3.diff(d1, 'days'));
}


module.exports = {
	actual: actual,
	thirtyThreeSixty: thirtyThreeSixty
};