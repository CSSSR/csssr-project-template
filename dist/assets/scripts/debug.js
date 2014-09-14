(function (window) {
	'use strict';

	// Установка иконки, заголовка и вывод сообщения в консоли
	// в режиме отладки на локальном сервере
	if (/localhost|127\.0\.0\.1/.test(window.location.hostname)) {
		var document = window.document,
			favicon = document.createElement('link'),
			title = document.getElementById('title'),
			titleText = 'DEBUG — ' + title.innerText;

		favicon.rel = 'icon';
		favicon.href = '/debug.ico';
		document.head.appendChild(favicon);

		title.innerText = titleText;

		console.info(titleText);
	}
})(window);
