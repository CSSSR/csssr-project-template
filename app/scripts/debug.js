// Setting favicon, title and message on the console
// in debug mode on the local server
export default function () {
	if (/localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}/.test(window.location.hostname)) {
		const console = window.console;
		const document = window.document;
		const favicon = document.createElement('link');
		const titleText = 'DEBUG — ' + document.title;

		favicon.rel = 'icon';
		favicon.href = '/debug.ico';
		document.title = titleText;

		document.getElementsByTagName('head')[0].appendChild(favicon);

		if (console && console.info) {
			console.info(titleText);
		}
	}
}
