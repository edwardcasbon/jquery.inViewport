# inViewport

A jQuery plugin for the detection of HTML elements within the browser viewport.

## Getting and installing

You can download the latest version from here:

https://github.com/edwardcasbon/jquery.inViewport

To use in your own page, place the jquery.inViewport.min.js file where your web page can load it, and copy the example below.

## Example usage:

```js
$("#elementID").inViewport(function(){
  // Callback for when the element appears in the viewport.
  $(this).html("I'm in the viewport");
}, function(){
  // Callback for when the element disappears from the viewport.
  $(this).html("I've disappeared from the viewport");
});
```
