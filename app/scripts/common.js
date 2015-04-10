$(function () {
	$.fn.ruShinaSlider = function () {
		var opt = {};

		opt.prevArrow = $('.js-slick__prev', this);
		opt.nextArrow = $('.js-slick__next', this);

		opt.autoplay = Boolean(this.attr('data-autoplay'));
		opt.autoplaySpeed = Number(this.attr('data-autoplay')) || 5000;
		opt.speed = Number(this.attr('data-speed')) || 200;
		opt.infinite = Boolean(this.attr('data-infinite')) || false;

		opt.slidesToShow = Number(this.attr('data-show')) || 4;
		opt.slidesToScroll = Number(this.attr('data-scroll')) || opt.slidesToShow;

		opt.useCSS = true;

		var slickContaner = $('.js-slick__container', this);

		if (slickContaner.hasClass('slick-initialized')) {
			slickContaner.slick('unslick');
		}

		slickContaner.slick(opt);
	};

	$.fn.showAsMenuIn = function (context, opt) {
		var name = this.data('menu'),
			this_ = this,
			$document = $(document),
			triggerSelector = '[data-toggle="' + name + '"]';

		if (this.is(':visible')) {
			return;
		}

		this.show();
		opt.onshow && opt.onshow.call(this_);

		$(triggerSelector, context).addClass(opt.trigger_active_className);

		requestAnimationFrame(function () { // hack for skipping current event bubbling
			$document.on('click', function listener(event) {
				var target = $(event.target);

				if (target.closest(this_).length === 0) {
					$document.off('click', listener);
					$(triggerSelector, context).removeClass(opt.trigger_active_className);
					this_.hide();
					opt.onhide && opt.onhide.call(this_);
				}
			});
		});
	};

	'use strict';

	var $document = $(document);

	// select2 defaults
	$.fn.select2.defaults.minimumResultsForSearch = -1;
	$('select').select2();

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

		$('[data-toggle=".js-discs-specs"], [data-toggle=".js-rear-discs"]').one('click', function () {
			var $discsSpecs = $('[data-toggle=".js-discs-specs"]');

			if ($discsSpecs.is($(this))) {
				$discsSpecs.remove();
				return;
			}

			$discsSpecs
				.first()
					.click().end()
				.remove();
		});
	})();

	// wheel filter by car model
	(function () {
		var $root = $('.js-wf'),
			// select2 clones classes from original <select> so we overqualify
			$brandSelect = $('select.js-wf-select_brand', $root),
			$modelSelect = $('select.js-wf-select_model', $root),
			$yearSelect = $('select.js-wf-select_year', $root),
			$modSelect = $('select.js-wf-select_mod', $root);

		(function () {
			var url = '/fixtures/wf-car-brands.json',
				nothing = function () {
					return $('<option>', {disabled: true, selected: true, value: ''});
				};

			$.getJSON(url, function (d) {
				var $fragment = $(document.createDocumentFragment());

				nothing()
					.appendTo($fragment);

				d.forEach(function (d) {
					$('<option>', {value: d.id})
						.text(d.text)
						.appendTo($fragment);
				});

				$brandSelect
					.html($fragment)
					.attr('disabled', false)
					.select2({placeholder: 'Выберите'});
			});
		})();

		// brand
		$brandSelect.on('change', function () {
			var url = '/fixtures/wf-car-models.json',
				nothing = function () {
					return $('<option>', {disabled: true, selected: true, value: ''});
				};

			$yearSelect.add($modSelect)
				.attr('disabled', true)
				.find('option')
					.remove().end()
				.append(nothing())
				.select2();

			$.getJSON(url, function (d) {
				var $fragment = $(document.createDocumentFragment());

				nothing()
					.appendTo($fragment);

				d.forEach(function (d) {
					$('<option>', {value: d.id})
						.text(d.text)
						.appendTo($fragment);
				});

				$modelSelect
					.html($fragment)
					.attr('disabled', false)
					.select2({placeholder: 'Выберите'});
			});
		});

		// model
		$modelSelect.on('change', function () {
			var url = '/fixtures/wf-car-years.json',
				nothing = function () {
					return $('<option>', {disabled: true, selected: true, value: ''});
				};

			$modSelect
				.attr('disabled', true)
				.find('option')
					.remove().end()
				.append(nothing())
				.select2();

			$.getJSON(url, function (d) {
				var $fragment = $(document.createDocumentFragment());

				nothing()
					.appendTo($fragment);

				d.forEach(function (d) {
					$('<option>', {value: d.id})
						.text(d.text)
						.appendTo($fragment);
				});

				$yearSelect
					.html($fragment)
					.attr('disabled', false)
					.select2({placeholder: 'Выберите'});
			});
		});

		// year
		$yearSelect.on('change', function () {
			var url = '/fixtures/wf-car-mods.json',
				nothing = function () {
					return $('<option>', {disabled: true, selected: true, value: ''});
				};

			$.getJSON(url, function (d) {
				var $fragment = $(document.createDocumentFragment());

				nothing()
					.appendTo($fragment);

				d.forEach(function (d) {
					$('<option>', {value: d.id})
						.text(d.text)
						.appendTo($fragment);
				});

				$modSelect
					.html($fragment)
					.attr('disabled', false)
					.select2({placeholder: 'Выберите'});
			});
		});
	})();

	$('.js-countdown-clock').FlipClock(3600 * 24 * 3, {
		clockFace: 'DailyCounter',
		countdown: true,
		language: 'ru'
	});

	// navbar
	(function () {
		// scroll’n’roll
		var $root = $('.js-sticky-nav'),
			$triggers = $('[data-toggle]', $root),
			$mainMenu = $('.js-main-menu'),
			headerFixClass = 'sticky-nav_fixed',
			visibleMenusCount = 0;

		function syncFlipMenu() {
			if (visibleMenusCount !== 0) {
				return false;
			}

			var windowTop = $document.scrollTop(),
				menuTop = $mainMenu.offset().top;

			if (windowTop > menuTop) {
				$root.addClass(headerFixClass);
			} else {
				$root.removeClass(headerFixClass);
			}
		}

		$triggers.on('click', function (e) {
			var toggle = $(this).data('toggle');
			var menu = $('[data-menu="' + toggle + '"]', $root);

			menu.showAsMenuIn($root, {
				trigger_active_className: 'top-menu__tab_active',

				onshow: function () {
					++visibleMenusCount;

					$('.js-slick', this).each(function () {
						$(this).ruShinaSlider();
					});
				},

				onhide: function () {
					--visibleMenusCount;
					if (visibleMenusCount === 0) {
						syncFlipMenu();
					}
				}
			});
		});

		$document.on('scroll', syncFlipMenu);
		syncFlipMenu();
	})();

	// item slider
	(function () {
		$('.js-slick').each(function () {
			$(this).ruShinaSlider();
		});
	})();

	// marquee
	(function () {
		var root = '.js-marquee';

		$(root).each(function (i, el) {
			var opt = {},
				$el = $(el);

			opt.accessibility = false;
			opt.arrows = false;
			opt.draggable = false;
			opt.swipe = false;

			opt.autoplay = true;
			opt.autoplaySpeed = 0;
			opt.infinite = true;
			opt.speed = 2000;

			opt.slidesToScroll = 1;
			opt.slidesToShow = 4;

			opt.cssEase = 'linear';

			$(root + '__container', $el).slick(opt);
		});
	})();
});
