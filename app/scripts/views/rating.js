$(function () {
	function RatingView(container) {
		this.container = container;
		this.input = container.querySelector('input');
		this.valueEl = container.querySelector('*[data-value]');

		if (!this.input) {
			throw new Error('Can not create interactive rating without input element.');
		}

		if (!this.valueEl) {
			throw new Error('Can not create interactive rating without data-value element.');
		}

		this.onContainerClick_ = this.onContainerClick_.bind(this);
		this.onContainerMousemove_ = this.onContainerMousemove_.bind(this);
		this.onContainerMouseout_ = this.onContainerMouseout_.bind(this);

		this.attach();
	}

	RatingView.prototype.CLASS_INTERACTIVE = 'rating_interactive';

	RatingView.prototype.attach = function () {
		var container = this.container;

		this.setValue_(this.valueEl.dataset.value);

		container.addEventListener('click', this.onContainerClick_);
		container.addEventListener('mousemove', this.onContainerMousemove_);
		container.addEventListener('mouseout', this.onContainerMouseout_);

		container.classList.add(this.CLASS_INTERACTIVE);
	};

	RatingView.prototype.detach = function () {
		var container = this.container;

		container.removeEventListener('click', this.onContainerClick_);
		container.removeEventListener('mousemove', this.onContainerMousemove_);
		container.removeEventListener('mouseout', this.onContainerMouseout_);

		container.classList.remove(this.CLASS_INTERACTIVE);
	};

	RatingView.prototype.onContainerClick_ = function (event) {
		var pos = this.calcStarPosition_(event);
		this.setValue_(pos);
		this.submit_();
	};

	RatingView.prototype.onContainerMousemove_ = function (event) {
		var pos = this.calcStarPosition_(event);
		this.displayValue_(pos);
	};

	RatingView.prototype.onContainerMouseout_ = function () {
		this.displayValue_(this.getValue_());
	};

	RatingView.prototype.calcStarPosition_ = function (event) {
		var container = this.container,
			containerRect = container.getBoundingClientRect(),
			eventX = event.clientX,
			relativePositionX = (eventX - containerRect.left) / containerRect.width,
			part = Math.floor(relativePositionX * 5) + 1;

		return part;
	};

	RatingView.prototype.displayValue_ = function (value) {
		this.valueEl.dataset.value = value;
	};

	RatingView.prototype.setValue_ = function (value) {
		this.input.value = String(value);
	};

	RatingView.prototype.getValue_ = function () {
		return Number(this.input.value);
	};

	RatingView.prototype.submit_ = function () {
		this.input.form.submit();
	};

	$('.js-rating').each(function (i, el) {
		new RatingView(el);
	});
});
