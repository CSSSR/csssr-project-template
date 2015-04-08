$(function () {

	'use strict';

	$('.js-countdown-clock').FlipClock(3600 * 24 * 3, {
		clockFace: 'DailyCounter',
		countdown: true,
		language: 'ru'
	});

});
