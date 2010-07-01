============
Placeholder plugin for jQuery
============
*A jQuery plugin that enables HTML5 placeholder support for legacy browsers*

The HTML5 placeholder attribute is awesome, unfortunately only supported by some browsers. This
plugin replicates the placeholder behavior for unsupported browsers.

- Checks for placeholder support before running
- Tested in IE (6,7,8).
- Works with password inputs

Usage
=====
$(':text[placeholder],:password[placeholder]').placeholder();