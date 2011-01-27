============
Placeholder plugin for jQuery
============
*A jQuery plugin that enables HTML5 placeholder support for legacy browsers*

The HTML5 placeholder attribute is awesome, unfortunately only supported by some browsers. This
plugin replicates the placeholder behavior for unsupported browsers.

Compatibility:
^^^^^^^^^^^^^^
IE 6+
Firefox 3+
Safari 3+
Chrome ✓
Opera ✓
iPhone ✓
Android ✓

*Please note*
The placeholder attribute should not be used as an alternative to a label.
http://www.whatwg.org/specs/web-apps/current-work/multipage/common-input-element-attributes.html#the-placeholder-attribute

If you must hide labels, do it with JavaScript as you activate the placeholder.


Usage
=====

It's easy!::

    $('input[placeholder], textarea[placeholder]').placeholder();

Enjoy.

Credit
======
Copyright 2010, Daniel Stocks ( http://webcloud.se )

Thanks to Nikita Vasilyev and James Rosen for feedback and contribution.

TODO
====
- Clean up and make proper test cases.