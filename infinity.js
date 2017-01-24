(function (infinity, $, _, undefined) {
  var page,
      fetching = false,
      options = {
        loadUrl: '',
        bufferHeight: 90,
        contentContainer: '.content-container',
        parentContainer: this.contentContainer,
        itemContainer: '.card',
        startPage: 1,
        debug: false
      };
  infinity.getDistFromBottom = function () {
    var windowSize = $(window).height();
    var documentHeight = $(document).height();
    return documentHeight - windowSize;
  };
  infinity.getNeedsPrefill = function () {
    var containerSize = Math.min($(options.parentContainer).height(), $(document).height());
    var windowSize = $(window).height();
    if (options.debug) console.log('check prefill', windowSize, containerSize + options.bufferHeight);
    return windowSize > containerSize + options.bufferHeight;
  };
  infinity.scrollHandler = function() {
    if (options.debug) console.log('scrolling', infinity.getDistFromBottom());
    if (!fetching && infinity.getDistFromBottom() > 0) {
      page++;
      fetching = true;
      $.ajax({ url: options.loadUrl + page, method: 'get', success: function(html) { processHtml(html); } });
    }
  };
  infinity.resizeHandler = function () {
    if (options.debug) console.log('resizing, needs prefill check', infinity.getNeedsPrefill());
    if (!fetching && infinity.getNeedsPrefill()) {
      page++;
      fetching = true;
      $.ajax({ url: options.loadUrl + page, method: 'get', success: function (html) { processHtml(html); } });
    }
  };
  infinity.prefill = function () {
    if (!fetching) {
      page++;
      if (options.debug) console.log('prefilling ', page);
      fetching = true;
      $.ajax({ url: options.loadUrl + page, method: 'get', success: function (html) { processHtml(html); } });
    }
  };
  var scrollEvent = _.throttle(infinity.scrollHandler, 1000), resizeEvent = _.throttle(infinity.resizeHandler, 1000);
  infinity.initialize = function (opts) {
    options = $.extend(options, opts);
    page = options.startPage;
    window.addEventListener('scroll', scrollEvent);
    window.addEventListener('resize', resizeEvent);
    if (options.debug) console.log('inital load', page);
    fetching = true;
    $.ajax({ url: options.loadUrl + page, method: 'get', success: function (html) { processHtml(html); } });
  };
  function processHtml(data) {
    fetching = false;
    if ($(data).children(options.itemContainer).length > 0) {
      $(options.contentContainer).append(data);
      if (infinity.getNeedsPrefill()) infinity.prefill();
    } else {
      window.removeEventListener('scroll', scrollEvent);
      window.removeEventListener('resize', resizeEvent);
    }
  }
}(window.infinity = window.infinity || {}, jQuery, _));
