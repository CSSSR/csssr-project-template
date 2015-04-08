$(function () {

	'use strict';

	var
		$window = $(window),
		$headerWrapper = $('.js-header-wrapper'),
		$menuHeader = $('.js-menu-header'),
		$mainMenu = $('.js-main-menu'),
		$yourCars = $('.js-your-cars'),
		headerFix = 'header-wrapper_fix';

	$window.on('scroll', function () {
		var
			windowTop = $window.scrollTop(),
			menuTop = $mainMenu.offset().top;

		if (windowTop > menuTop) {
			$headerWrapper.addClass(headerFix);
		} else {
			$headerWrapper.removeClass(headerFix);
			$menuHeader.hide();
			$yourCars.hide();
		}
	});

	// open main menu
	$('.js-show-header-menu').on('click', function () {
		$menuHeader.toggle();
	});

	// open your cars
	$('.js-show-your-cars').on('click', function () {
		$yourCars.toggle();
	});

});
