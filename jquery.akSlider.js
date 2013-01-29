(function( $ ){

	$.fn.akSlider = function(options) {
		if (!options)
			$.error('Must supply options to akSlider!');
		if (!options.slides)
			$.error('Must supply options.slides to akSlider!');

		var self = this;

		var optionDefaults = {
			width: 640,
			showArrows: 'onhover',
			showNavButtons: 'always',
			autoAdvance: false,
			pauseOnNav: true,
			animate: 'horizontal',
			animationTime: 250
		};

		// apply options defaults where option was not specified
		$.each(optionDefaults, function(key, value) {
			if (typeof options[key] === 'undefined') options[key] = value;
		});

		var generateMarkup = function() {
			var controls = '<div class="akslider-controls">';
			controls += '<div class="akslider-nav-back"><div class="akslider-indicator"><span class="akslider-icon"></span></div></div>';
			controls += '<div class="akslider-nav-forward"><div class="akslider-indicator"><span class="akslider-icon"></span></div></div>';
			controls += '<ul class="akslider-slide-selectors"></ul>';
			controls += '</div>';
			var slideholder = '<ul class="akslider-slides"></ul>';

			self.html('').append(controls).append(slideholder);

			// build slides and navigation buttons
			$.each(options.slides, function(index, value) {
				var slideSelector = $('<li>').addClass('akslider-nav-to').attr('data-slide', index);
				self.find('.akslider-slide-selectors').append(slideSelector);
				var slide = $('<div>').addClass('akslider-slide').attr('data-slide', index);
				self.find('.akslider-slides').append(slide);

				var content;
				if (value.image)
					content = $('<img>').attr('src', value.image);
				else if (value.html)
					content = value.html;

				if (content)
					slide.append(content);
			});
		};

		generateMarkup();

		var currentSlide = 0;
		var paused = false;

		var initialize = function() {
			self.addClass('akslider-container');
			self.find('.akslider-slide[data-slide="' + currentSlide + '"], .akslider-nav-to[data-slide="' + currentSlide + '"]').addClass('akslider-current');
			self.find('.akslider-nav-back').click(navBack);
			self.find('.akslider-nav-forward').click(navForward);
			self.find('.akslider-nav-to').click(navTo);

			if (options.showArrows == 'onhover')
				self.addClass('akslider-show-arrows-onhover');

			if (options.showNavButtons == 'onhover')
				self.addClass('akslider-show-nav-buttons-onhover');
		};
		var slideCount = function() {
			return options.slides.length;
		};
		var updateCurrentSlide = function() {
			var slide = parseInt(self.find('.akslider-slide.akslider-current').attr('data-slide'), 10);
			if (typeof slide == 'number') currentSlide = slide;
		};
		var animateSlides = function(currentSlideElement, nextSlideElement, nextSlide, callback) {
			if (options.animate) {
				switch (options.animate) {
					case 'horizontal':
						animationHorizontal(currentSlideElement, nextSlideElement, nextSlide, callback);
						break;
					default:
						callback();
				}
			} else
				callback();
		};
		var animationHorizontal = function(currentSlideElement, nextSlideElement, nextSlide, callback) {

			var animationComplete = function() {
				$('.akslider-slide').css({
					display: '',
					top: '',
					right: '',
					bottom: '',
					left: ''
				});
				callback();
				return;
			};

			// TODO: consolidate slide forward and back since they are mostly the same
			if (currentSlide < nextSlide) {
				// slide forward
				nextSlideElement.css({
					left: options.width,
					display: 'block'
				});
				nextSlideElement.animate({
					left: 0
				}, options.animationTime);
				currentSlideElement.animate({
					right: options.width
				}, options.animationTime, animationComplete);
			} else if (currentSlide > nextSlide) {
				// slide backward
				nextSlideElement.css({
					right: options.width,
					display: 'block'
				});
				nextSlideElement.animate({
					right: 0
				}, options.animationTime);
				currentSlideElement.animate({
					left: options.width
				}, options.animationTime, animationComplete);
			} else {
				callback();
				return;
			}
		};
		var navigateTo = function(e, slide) {
			if (e && options.pauseOnNav)
				paused = true;

			var currentSlideElement = self.find('.akslider-slide.akslider-current');
			var nextSlideElement = self.find('.akslider-slide[data-slide="' + slide + '"]');

			animateSlides(currentSlideElement, nextSlideElement, slide, function() {
				currentSlideElement.removeClass('akslider-current');
				$('.akslider-nav-to.akslider-current').removeClass('akslider-current');
				nextSlideElement.addClass('akslider-current');
				$('.akslider-nav-to[data-slide="' + slide + '"]').addClass('akslider-current');
				updateCurrentSlide();
			});
		};
		var navBack = function(e) {
			if (currentSlide == 0)
				navigateTo(e, (slideCount() - 1));
			else
				navigateTo(e, (currentSlide - 1));
		};
		var navForward = function(e) {
			if (currentSlide == (slideCount() - 1))
				navigateTo(e, 0);
			else
				navigateTo(e, (currentSlide + 1));
		};
		var navTo = function(e) {
			navigateTo(e, $(e.target).attr('data-slide'));
		};
		var autoAdvance = function() {
			if (!paused) {
				navForward();
				window.setTimeout(autoAdvance, options.autoAdvance);
			}
		};

		initialize();

		if (options.autoAdvance)
			window.setTimeout(autoAdvance, options.autoAdvance);

	};

})( jQuery );
