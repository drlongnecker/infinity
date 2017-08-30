# infinity.js

A simple infinite scrolling and content loader for HTML-based data feeds.

Dependencies:
- jQuery, lodash

Main features:
- tiny
- prefilling (fill until viewport/container is full)
- fill on resize and scroll

Tested in:
- Chrome 55
- Microsoft Edge (latest, insider build 15007)
- FireFox 49
- Internet Explorer 11
- Android Browser
- iOS Safari

Usage:

```
infinity.initialize({
  // where the feed is coming from
  loadUrl: '/api/articles/as/html?count=3&page={page}',
  // where the rendered HTML goes
  contentContainer: '.content-container',
  // the maximum container size (to figure in total height); defaults to contentContainer
  parentContainer: '.grid',
  // the item to look for in the feed to determine if it should keep loading
  itemContainer: '.card',
  // additional height to add to contentContainer to account for things like ad rows
  bufferHeight: 90,
  // page to start on
  startPage: 1,
  // all the console.log() messages...
  debug: true,
  // function to run before the URL is loaded; happens each iteration.
  preload: function() { $('.placeholder').show(); },
  // function to run after the URL is loaded; happens each iteration.
  iterative: function() { $('.placeholder.hide(); },
  // function to run after there's nothing more to load.
  postload: function() { }
});
```
