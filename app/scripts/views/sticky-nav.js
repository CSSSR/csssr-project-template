$(function () {

	'use strict';

	// scroll’n’roll
	var $document = $(document),
		$root = $('.js-sticky-nav'),
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

	$triggers.on('click', function () {
		var toggle = $(this).data('toggle'),
			menu = $('[data-menu="' + toggle + '"]', $root);

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
});
