$(function () {

	'use strict';

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

});
