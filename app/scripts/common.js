$(function () {

	'use strict';

	var $document = $(document),
		SELECT2_OPTIONS = {
			minimumResultsForSearch: -1
		};

	$('select').select2(SELECT2_OPTIONS);

	// wheel filter
	(function () {
		var $wf = $('.js-wf'),
			$tabs = $('.js-wf-tab', $wf),
			$bodies = $('.js-wf-body', $wf),
			$discs = $('.js-rear-discs', $wf),
			$discsSpecs = $('.js-discs-specs', $wf),
			$tires = $('.js-rear-tires', $wf);

		$discs.add($tires).add($discsSpecs)
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
		headerFix = 'header-wrapper_fix',
		$mainMenu = $('.js-main-menu'),
		visibleMenusCount = 0,
		syncFlipTimeout = 0;

	function syncFlipMenu() {
		if (visibleMenusCount !== 0) {
			return false;
		}

		var windowTop = $document.scrollTop(),
			menuTop = $mainMenu.offset().top;

		if (windowTop > menuTop) {
			$headerWrapper.addClass(headerFix);
		} else {
			$headerWrapper.removeClass(headerFix);
			$menuHeader.hide();
			$yourCars.hide();
		}
	}

	function toggleMenuListener(menu) {
		return function (event) {
			var ts = event.timeStamp;

			if (menu.is(':hidden')) {
				menu.show();
				++visibleMenusCount;
				clearTimeout(syncFlipTimeout);

				$document.on('click', function listener(event) {
					if (event.timeStamp === ts) { // same event
						return;
					}

					var $target = $(event.target);

					if ($target.closest(menu).length === 0) {
						$document.off('click', listener);
						menu.hide();
						--visibleMenusCount;
						syncFlipTimeout = setTimeout(syncFlipMenu, 10);
					}
				});
			}
		};
	}

	$document.on('scroll', syncFlipMenu);
	syncFlipMenu();

	// open main menu
	$('.js-show-header-menu').on('click', toggleMenuListener($menuHeader));

	// open your cars
	$('.js-show-your-cars').on('click', toggleMenuListener($yourCars));

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
			opt.speed = Number($el.attr('data-speed')) || 200;
			opt.infinite = Boolean($el.attr('data-infinite')) || false;

			opt.slidesToShow = Number($el.attr('data-show')) || 4;
			opt.slidesToScroll = Number($el.attr('data-scroll')) || opt.slidesToShow;

			opt.useCSS = true;

			$(root + '__container', $el).slick(opt);
		});
	})();
});
