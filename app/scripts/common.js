$(function () {

	'use strict';

	var SELECT2_OPTIONS = {
		minimumResultsForSearch: -1
	};

	$('select').select2(SELECT2_OPTIONS);

	// wheel filter
	(function () {
		var
		$wf = $('.js-wf'),
		$tabs = $('.js-wf-tab', $wf),
		$bodies = $('.js-wf-body', $wf),
		$discs = $('.js-rear-discs', $wf),
		$tires = $('.js-rear-tires', $wf);

		$discs.add($tires)
			.not('[data-hide-on-init="false"]')
			.hide();

		$tabs.on('click', function (e) {
			var
			$target = $(e.target).closest('.js-wf-tab'),
			id = $target.attr('data-id');

			$tabs.removeClass('wf__tab_active');
			$target.addClass('wf__tab_active');

			$bodies.removeClass('wf-body_active');
			$('.js-wf-body_' + id, $wf).addClass('wf-body_active');
		});

		$('[data-toggle]', $wf).on('click', function (e) {
			var group = $(e.target).closest('[data-toggle]').attr('data-toggle');
			console.log(group);
			console.log($(group, $wf));
			$(group, $wf).toggle();
		});
	})();
});
