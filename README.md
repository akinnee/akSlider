akSlider
========

NOT FINISHED!

Lightweight jQuery slideshow

This will receive minimal updates/support from now on as it is being superseded by AkCoffeeSlideshow (https://github.com/akinnee/AkCoffeeSlideshow)

Options
-----

**showArrows**
* Default
	* onhover
* Other Values
	* always

**showNavButtons**
* Default
	* always
* Other Values
	* onhover

**autoAdvance**
* Default
	* false
* Other Values
	* any millisecond value

**pauseOnNav**
* Default
	* true
* Other Values
	* false

Usage Example
-----

	$('.tutorial-slideshow').akSlider({
		slides: [
			{
				html: '<div>Any HTML you want!</div>'
			},
			{
				image: '/path/to/image.png'
			}
		],
		showArrows: 'onhover'
	    // other options here
	});

