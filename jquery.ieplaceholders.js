(function($) {

  var prototype = $.fn;
  iePlaceholder = prototype.iePlaceholder = function() {
    var input = $(this);

    // Check normal browsers.
    var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
    var isInputSupported = 'placeholder' in document.createElement('input');
    var isTextareaSupported = 'placeholder' in document.createElement('textarea');
    // Exit execution for normal browsers.
    if (isInputSupported && isTextareaSupported && !isOperaMini) {
      return;
    }

    input.parrent = input.parent();
    input.parrent.addClass('placeholder-parrent');

    // Prepare placeholder.
    var text = input.attr('placeholder');
    input.placeholder = $("<div/>", {
      'class': 'placeholder-overlay',
      'text': text
    });
    input.placeholder.input = input;
    // Copy placeholder styles.
    var styles = ['font-size', 'font-weight', 'font-family'];
    $.each(styles , function(item, value) {
      input.placeholder.css(value, input.css(value));
    });
    // Calculate placeholder position.
    setPosition(input);
    input.after(input.placeholder);

    // Toggle placeholder.
    togglePlaceholder(input);
    input.bind('input', function() {
      togglePlaceholder(input);
    });
    input.placeholder.click( function() {
      togglePlaceholder(input);
      input.focus();
    });

    // Highlight placeholder on focus.
    input.focus(function() {
      input.placeholder.addClass('highlighted');
    });
    // Unhighlight placeholder on blur.
    input.blur(function() {
      input.placeholder.removeClass('highlighted');
      togglePlaceholder(input);
    });

    /**
     * Toggle placeholder.
     */
    function togglePlaceholder(input) {
      if (input.val() !== '') {
        input.placeholder.hide();
      }
      else {
        input.placeholder.show();
      }
    };

    /**
     * Calculate input placeholder position.
     *
     * @returns array position
     */
    function setPosition(input) {
      var left = 0, top = 0;
      if(paddingLeft = parseInt(input.parrent.css('padding-left'))) {
        left += paddingLeft;
      }
      if(margingLeft = parseInt(input.parrent.css('marging-left'))) {
        left += paddingLeft;
      }
      if(paddingLeft = parseInt(input.css('padding-left'))) {
        left += paddingLeft;
      }
      if(margingLeft = parseInt(input.css('marging-left'))) {
        left += paddingLeft;
      }
      if(paddingTop = parseInt(input.parrent.css('padding-top'))) {
        top += paddingTop;
      }
      if(margingTop = parseInt(input.parrent.css('marging-top'))) {
        top += margingTop;
      }
      if(paddingTop = parseInt(input.css('padding-top'))) {
        top += paddingTop;
      }
      if(margingTop = parseInt(input.css('marging-top'))) {
        top += margingTop;
      }
      input.placeholder.css('top', top);
      input.placeholder.css('left', left);
    };
  }

})(jQuery);
