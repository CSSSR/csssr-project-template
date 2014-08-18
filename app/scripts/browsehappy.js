// Заглушка для неподдерживаемых браузеров
(function (userAgent) {
	var ua = detect.parse(userAgent),
		browser = ua.browser.family,
		os = ua.os.family,
		version = ua.browser.major,
		osVersion = ua.os.major;

	if (
		os      === 'Android' && osVersion < '@@android' || // Android @@android+
		browser === 'Chrome'  && version   < '@@chrome'  || // Chrome @@chrome+
		browser === 'Firefox' && version   < '@@firefox' || // Firefox @@firefox+
		browser === 'IE'      && version   < '@@ie'      || // IE @@ie+
		os      === 'iOS'     && osVersion < '@@ios'     || // iOS @@ios+
		browser === 'Opera'   && version   < '@@opera'   || // Opera @@opera+
		browser === 'Safari'  && version   < '@@safari'     // Safari @@safari+
	) {
		// Показываем сообщение о неподдерживаемом браузере
		document.body.innerHTML = (
			'<iframe ' +
				'src="http://csssr.ru/browsehappy/" ' +
				'frameborder="0" ' +
				'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"' +
			'></iframe>'
		);

		return false;
	}
})(window.navigator.userAgent);
