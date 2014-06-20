/**
* inViewport: A jQuery plugin for the detection of HTML elements within the viewport
* Author: Edward Casbon
* Email: edward@edwardcasbon.co.uk
* URL: http://www.edwardcasbon.co.uk
* Version: 1.2
* Date: 20th June 2014
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
(function($){
	
	// Global array where all the elements are recorded.
	var inViewportElements = [];
	
	// Plugin starts here.
	$.fn.inViewport = function(inFunction, outFunction) {
		
		// Loop through all the elements selected.
		return this.each(function(){
			
			// Add the element, with in and out functions to the elements array.
			var el = {
				element: this,
				inFunction: inFunction,
				outFunction: outFunction
			};
			inViewportElements.push(el);
			
			// Do the check to see if any of the elements are in the viewport.
			doCheck = function() {

				// Calculate the viewports measurements.
				var vpTop 		= $(window).scrollTop(),
					vpBottom 	= vpTop + $(window).height(),
					vpLeft 		= $(window).scrollLeft(),
					vpRight 	= vpLeft + $(window).width();
				
				// Loop through the elements checking if they're in the viewport.
				for(var i=0; i<inViewportElements.length; i++) {
					
					// Calculate the elements measurements.
					var element 	= inViewportElements[i].element,
						$element 	= $(element),
						elTop 		= $element.offset().top,
						elLeft 		= $element.offset().left,
						elRight 	= elLeft + $element.outerWidth(),
						elBottom  	= elTop + $element.outerHeight();
					
					// Check the elements measurements against the viewports.	
					if (
						elTop < vpBottom 
						&& elLeft < vpRight 
						&& elBottom > vpTop 
						&& elRight > vpLeft
					) {
						// In viewport.
						if($element.attr('data-vpStatus') != "in") {
							// If not already in the viewport, then update the status...
							$element.attr('data-vpStatus', "in");
							// .. and fire the callback.
							if(typeof(inViewportElements[i].inFunction) == "function") inViewportElements[i].inFunction.call(element);
						}
					} else {
						// Not in viewport.
						if($element.attr('data-vpStatus') != "out") {
							// If not already out of the viewport, then update the status...
							$element.attr('data-vpStatus', "out");
							// .. and fire the callback.
							if(typeof(inViewportElements[i].outFunction) == "function") inViewportElements[i].outFunction.call(element);
						}
					}
				}
			};
			
			// On scroll, resize and load, check if the elements are in the viewport.
			$(window).scroll(doCheck).resize(doCheck);
			doCheck();			
		});
	}
})(jQuery);