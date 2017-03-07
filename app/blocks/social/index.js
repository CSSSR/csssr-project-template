/* eslint-disable */
import $ from 'jquery';

$(() => {
	FB.init({
		appId: 1805267866466228,
		xfbml: true,
		version: 'v2.5'
	});

	$('.js-social-fb').click(event => {
		event.preventDefault();
		const $this = $(event.target);
		const link = $this.attr('data-url');
		const name = $this.attr('data-title');
		const description = $this.attr('data-text');
		const picture = $this.attr('data-image');
		FB.ui({
			method: 'feed',
			link,
			name,
			description,
			picture
		}, () => {})
	})
})
/* eslint-enable */
