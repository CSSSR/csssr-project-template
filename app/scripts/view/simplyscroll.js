$(function () {
	'use strict';

	$('.js-simplyscroll').each(function (i, el) {
		$('.js-simplyscroll__container', el).simplyScroll({
			frameRate: 60
		});
	});
});
