$(function () {

	'use strict';

	// collapsable
	(function () {
		var hook = '.js-collapsable',
			$tpl = $('<span/>', {
				class: 'toggler'
			});

		$(hook).each(function (i, el) {
			var $el = $(el),
				$items = $el.children(),
				$toggler = $tpl.clone(),
				opt = {},
				$hideable;

			opt.show = $el.data('show') || 5;
			opt.limit = $el.data('limit') || opt.show * 2;
			opt.labels = $el.data('labels') || {
				show: 'Показать все',
				hide: 'Скрыть'
			};

			if ($items.length < opt.limit) {
				return;
			}

			$hideable = $items.slice(opt.show);
			$hideable.hide();

			$toggler
				.on('click', function () {
					var visible;

					$hideable.toggle();

					visible = $hideable.is(':visible');

					$toggler.toggleClass('toggler_hide', visible);
					$toggler.text(visible ? opt.labels.hide : opt.labels.show);
				})
				.text(opt.labels.show)
				.appendTo($el);
		});
	})();

});
