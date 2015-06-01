// Setting favicon, title and message on the console
// in debug mode on the local server
export default function () {
	if (/localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}/.test(window.location.hostname)) {
		var console = window.console;
		var document = window.document;
		var favicon = document.createElement('link');
		var titleText = 'DEBUG — ' + document.title;

		favicon.rel = 'icon';
		favicon.href = '/debug.ico';
		document.title = titleText;

		document.getElementsByTagName('head')[0].appendChild(favicon);

		console && console.info && console.info(titleText);
	}
}
