$(function () {

	'use strict';

	var root = '.js-slick';

	$(root).each(function (i, el) {
		var
			$el = $(el),
			opt = {};

		opt.prevArrow = $(root + '__prev', $el);
		opt.nextArrow = $(root + '__next', $el);

		opt.autoplay = $el.data('autoplay');
		opt.autoplaySpeed = $el.data('autoplay') || 5000;
		opt.infinite = $el.data('infinite') || false;

		opt.slidesToShow = $el.data('show') || 4;
		opt.slidesToScroll = $el.data('scroll') || opt.slidesToShow;

		// TODO: set `-container` instead of `__container`
		$(root + '__container', $el).slick(opt);
	});

});
