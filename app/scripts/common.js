$(function () {

	'use strict';
	var SELECT2_OPTIONS = {
		minimumResultsForSearch: -1
	};

	$('select').select2(SELECT2_OPTIONS);

	// wheel filter
	(function () {
		var $wf = $('.js-wf'),
			$tabs = $('.js-wf-tab', $wf),
			$bodies = $('.js-wf-body', $wf),
			$discs = $('.js-rear-discs', $wf),
			$tires = $('.js-rear-tires', $wf);

		$discs.add($tires)
			.not('[data-hide-on-init="false"]')
			.hide();

		$tabs.on('click', function (e) {
			var $target = $(e.target).closest('.js-wf-tab'),
				id = $target.attr('data-id');

			$tabs.removeClass('wf__tab_active');
			$target.addClass('wf__tab_active');

			$bodies.removeClass('wf-body_active');
			$('.js-wf-body_' + id, $wf).addClass('wf-body_active');
		});

		$('[data-toggle]', $wf).on('click', function (e) {
			var group = $(e.target).closest('[data-toggle]').attr('data-toggle');
			$(group, $wf).toggle();
		});
	})();


	$('.js-countdown-clock').FlipClock(3600 * 24 * 3, {
		clockFace: 'DailyCounter',
		countdown: true,
		language: 'ru'
	});


	// header roll

	var $headerWrapper = $('.js-header-wrapper'),
		$menuHeader = $('.js-menu-header'),
		$yourCars = $('.js-your-cars'),
		headerFix = 'header-wrapper_fix';

	$(document).on('scroll', function () {
		var windowTop = $(document).scrollTop(),
			menuTop = $('.js-main-menu').offset().top;
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

	// item slider
	(function () {
		var root = '.js-slick';

		$(root).each(function (i, el) {
			var opt = {},
				$el = $(el);

			opt.prevArrow = $(root + '__prev', $el);
			opt.nextArrow = $(root + '__next', $el);

			opt.autoplay = Boolean($el.attr('data-autoplay'));
			opt.autoplaySpeed = Number($el.attr('data-autoplay')) || 5000;
			opt.infinite = Boolean($el.attr('data-infinite')) || false;

			opt.slidesToShow = Number($el.attr('data-show')) || 4;
			opt.slidesToScroll = Number($el.attr('data-scroll')) || opt.slidesToShow;

			$(root + '__container', $el).slick(opt);
		});
	})();

	// aside bar
	$('.js-filter-checkbox-open').on('click', function () {
		var $checkbox = $(this).parent().find('.js-filter-checkbox-hide');
		console.log($(this).parent().find('.js-filter-checkbox-hide'));
		if ($(this).attr('data-status') === 'show') {
			$(this).attr('data-status', 'hide');
			$(this).text($(this).data('show'));
			$(this).removeClass('hide');
			$checkbox.addClass('hide');
		} else {
			$(this).attr('data-status', 'show');
			$(this).text($(this).data('hide'));
			$(this).addClass('hide');
			$checkbox.removeClass('hide');
		}
	});
});
