/**
* inViewport: A jQuery plugin for the detection of HTML elements within the viewport
* Author: Edward Casbon
* Email: edward@edwardcasbon.co.uk
* URL: http://www.edwardcasbon.co.uk
* Version: 1.0
* Date: 26th March 2013
*
* Example usage:
* $("#elementID").inViewport(function(){
* 	$(this).html("I'm in the viewport");
* }, function(){
*	$(this).html("I'm no longer in the viewport");
* }); 
* Argument 1 is a callback function for when the element appears in the viewport.
* Argument 2 is a callback function for when the element disappears from the viewport.
**/

(function($) {
	
	// Global array where all the elements are recorded.
	var inViewportElements = [];
	
	// Plugin starts here.
	$.fn.inViewport = function(inFunction, outFunction) {

		// Loop through all the elements selected.
		return this.each(function(){
			
			// Cache the element.
			$element = $(this);

			// Get the position of the element.
			elTop = $element.offset().top;
			elLeft = $element.offset().left;
			elRight = elLeft + $element.outerWidth();
			elBottom = elTop + $element.outerHeight();
			
			// Create an object and add it to the elements array.
			elObject = {
				'element': 			this,
				'elTop': 			elTop,
				'elLeft': 			elLeft,
				'elRight': 			elRight,
				'elBottom': 		elBottom,
				'inFunction': 		inFunction,
				'outFunction': 		outFunction,
				'currentStatus': 	'out'
			};
			inViewportElements.push(elObject);

			// Function to check if an element is in the viewport.
			inViewport = function(el) {
				viewPortTop = $(window).scrollTop();
				viewPortBottom = viewPortTop + $(window).height();
				viewPortLeft = $(window).scrollLeft();
				viewPortRight = viewPortLeft + $(window).width();
								
				return ( 
					el.elTop < viewPortBottom 
					&& el.elLeft < viewPortRight 
					&& el.elBottom > viewPortTop 
					&& el.elRight > viewPortLeft
				)
			}

			// Do the check to see if any of the elements are in the viewport.
			doCheck = function() {
				for(i=0; i<inViewportElements.length; i++) {
					theElement = inViewportElements[i];
					if (inViewport(theElement) && theElement.currentStatus != 'in') {
						// Element is in the viewport.
						theElement.currentStatus = 'in';
						if(typeof(theElement.inFunction) == "function") theElement.inFunction.call(theElement.element);
					} else if(!inViewport(theElement) && theElement.currentStatus != 'out') {
						// Element has left the viewport.
						theElement.currentStatus = 'out';
						if(typeof(theElement.outFunction) == "function") theElement.outFunction.call(theElement.element);
					}
				}
			}

			// On scroll and resize, check the elements viewport status.
			$(window).scroll(doCheck).resize(doCheck);
			
			// On load, check the elements viewport status.
			doCheck();
		});
	};
})(jQuery);