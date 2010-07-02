/* 
 * Placeholder plugin for jQuery
 * 
 * Enables HTML5 placeholder support for legacy browsers.
 * ---
 * This code is a modified version of the work by Andrew January
 * http://www.morethannothing.co.uk/2010/01/placeholder-text-in-html5-a-js-fallback/
 * ---
 * @author Daniel Stocks (http://webcloud.se)
 * @version 0.1
 * @updated 1-JUL-2010
 * ---
 */
 
(function($) {
    
    function Placeholder(input) {
        // We change the type of password fields to text so their placeholder shows.
        // We need to store somewhere that they are actually password fields so we can convert
        // back when the users types something in.
        if (input.attr('type') == 'password') {
            input.attr('realType', 'password');
        }
        this.input = input;
        // For IE because it doesn't allow changing the type of password inputs
        this.fakePassword = $("<input>").val(input.attr('placeholder')).focus(function() {
            input.trigger("focus")
            $(this).hide();
        }).css({width : input.width()});
    }
    
    Placeholder.prototype = {
        show : function(loading) {
            // FF and IE saves input values when you refresh the page. If the user refreshes the page
            // with the placeholders showing they will be the default values and the input fields won't
            // be empty. Using loading && valueIsPlaceholder is a hack to get around this and highlight
            // the placeholders properly on refresh.
            if (this.input[0].value == '' || (loading && this.valueIsPlaceholder())) {
                if (this.isPassword()) {
                    // IE doesn't allow us to change the input type
                    try {
                        this.input[0].setAttribute('type', 'input');
                    } catch (e) {
                        this.input.before(this.fakePassword.show()).hide();
                    }
                }
                this.input[0].value = this.input.attr('placeholder');
                this.input.addClass('placeholder');
            }
        },
        
        hide : function() {
            if (this.valueIsPlaceholder() && this.input.hasClass('placeholder')) {
                if (this.isPassword()) {
                    try {
                        this.input[0].setAttribute('type', 'password');
                    } catch (e) { }
                    // Restore focus for Opera and IE
                    this.input.show()
                    this.input[0].focus();
                }
                this.input[0].value = '';
                this.input.removeClass('placeholder');
            }
        },
        
        isPassword: function() {
            return this.input.attr('realType') == 'password';
        },
        
        valueIsPlaceholder : function() {
            return this.input[0].value == this.input.attr('placeholder');
        }
    }
    // The actual jQuery "plugin".
    $.fn.extend({
        placeholder: function() {
            return this.each(function() {
                // If placeholder attribute is supported don't do anything.
                var i = document.createElement('input');
                if ('placeholder' in i) {
                    return;
                }
                var input = $(this);
                var placeholder = new Placeholder(input);
                placeholder.show(true);
                input.focus(function() {
                    placeholder.hide();
                });
                input.blur(function() {
                    placeholder.show(false);
                });
            });
        }
    })
})(jQuery);