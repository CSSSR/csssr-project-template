$(function () {

	'use strict';

	// TODO: set `.js-select2` instead of `select`
	$.fn.select2.defaults.minimumResultsForSearch = -1;
	$('select').select2();

});
