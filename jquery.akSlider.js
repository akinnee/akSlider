(function( $ ){

	$.fn.akSlider = function(options) {
		if (!options)
			$.error('Must supply options to akSlider!');
		if (!options.slides)
			$.error('Must supply options.slides to akSlider!');

		var self = this;

		var generateMarkup = function() {
			var controls = '<div class="akslider-controls">';
			controls += '<div class="akslider-nav-back"><div class="akslider-indicator"><span class="akslider-icon"></span></div></div>';
			controls += '<div class="akslider-nav-forward"><div class="akslider-indicator"><span class="akslider-icon"></span></div></div>';
			controls += '<ul class="akslider-slide-selectors"></ul>';
			controls += '</div>';
			var slideSelector = '<li class="akslider-nav-to" data-slide="1">';
			var slideholder = '<ul class="akslider-slides"></ul>';
			var slide = '<li class="akslider-slide" data-slide="1"></li>';

			self.html('').append(controls).append(slideholder);

			$.each(options.slides, function(index, value) {
				var slideSelector = $('<li>').addClass('akslider-nav-to').attr('data-slide', index);
				self.find('.akslider-slide-selectors').append(slideSelector);
				var slide = $('<div>').addClass('akslider-slide').attr('data-slide', index);
				self.find('.akslider-slides').append(slide);

				var content;
				if (value.image)
					content = $('<img>').attr('src', value.image);
				if (value.html)
					content = value.html;

				if (content)
					slide.append(content);
			});
		};

		generateMarkup();

		var currentSlide = 1;

		var initialize = function() {
			self.find('.akslider-slide[data-slide="' + currentSlide + '"], .nav-to[data-slide="' + currentSlide + '"]').addClass('current');
			self.find('.akslider-nav-back').click(navBack);
			self.find('.akslider-nav-forward').click(navForward);
			self.find('.akslider-nav-to').click(navTo);
		};
		var slideCount = function() {
			return self.find('.akslider-slide').length;
		};
		var updateCurrentSlide = function() {
			var currentSlide = parseInt(self.find('.akslider-slide.current').attr('data-slide'), 10);
			if (typeof currentSlide == 'number') currentSlide = currentSlide;
		};
		var navigateTo = function(slide) {
			self.find('.akslider-slide.current, .nav-to.current').removeClass('current');
			self.find('.akslider-slide[data-slide="' + slide + '"], .nav-to[data-slide="' + slide + '"]').addClass('current');
			updateCurrentSlide();
		};
		var navBack = function() {
			if (currentSlide == 1)
				navigateTo(slideCount());
			else
				navigateTo((currentSlide - 1));
		};
		var navForward = function() {
			if (currentSlide == slideCount())
				navigateTo(1);
			else
				navigateTo((currentSlide + 1));
		};
		var navTo = function(e) {
			navigateTo($(e.target).attr('data-slide'));
		};

		initialize();

	};

})( jQuery );
