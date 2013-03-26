inViewport
==========

jQuery plugin for the detection of HTML elements within the browser viewport.

Usage:

$("#elementID").inViewport(function(){
  // Callback for when the element appears in the viewport.
  $(this).html("I'm in the viewport");
}, function(){
  // Callback for when the element disappears from the viewport.
  $(this).html("I've disappeared from the viewport");
});
