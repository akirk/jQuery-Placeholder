/* 
* Placeholder plugin for jQuery
* @author Daniel Stocks (http://webcloud.se)
*/
(function($) {
    function Placeholder(input) {
        
        this.input = input;
        if (input.attr('type') == 'password') {
            this.handlePassword();
        }
        
        // Prevent placeholder values from submitting
        $(input[0].form).submit(function() {
            if (input.hasClass('placeholder')) {
                input[0].value = '';
            }
        });
    }
    Placeholder.prototype = {
        show : function(loading) {
            // FF and IE saves values when you refresh the page. If the user refreshes the page with 
            // the placeholders showing they will be the default values and the input fields won't be empty.
            if (this.input[0].value === '' || (loading && this.valueIsPlaceholder())) {
                if (this.isPassword) {
                    try {
                        this.input[0].setAttribute('type', 'text');
                    } catch (e) {
                        this.input.attr('id','').before(this.fakePassword.show().attr('id', this.id)).hide()
                    }
                }
                this.input[0].value = this.input.attr('placeholder');
                this.input.addClass('placeholder');
            }
        },
        hide : function() {
            if (this.valueIsPlaceholder() && this.input.hasClass('placeholder')) {
                if (this.isPassword) {
                    try {
                        this.input[0].setAttribute('type', 'password');
                    } catch (e) { }
                    // Restore focus for Opera and IE
                    this.input.show().attr('id', this.id);
                    this.input[0].focus();
                }
                this.input[0].value = '';
                this.input.removeClass('placeholder');
            }
        },
        valueIsPlaceholder : function() {
            return this.input[0].value == this.input.attr('placeholder');
        },
        handlePassword: function() {
            
            input = this.input;
            
            // Special treatment for password inputs
            if (input.attr('type') == 'password') {
                input.attr('realType', 'password');
                this.isPassword = true;
            }
            
            if ($.browser.msie && input[0].outerHTML) {
                
                console.log(this.isPassword);
                
                this.id = input[0].id;
                // IE < 9 doesn't allow changing the type of password inputs
                // so we need to some extra stuff here
                var fake = this.fakePassword = $('<input type="text" class="placeholder">').focus(function() {
                    input.trigger("focus");
                    $(this).removeAttr('id').hide();
                }).val(input.attr("placeholder"));
                // Copy all the attributes from original input (but only the ones that are specified (IE < 8))
                var attributes = $.map(input[0].attributes, function(item) {
                    if(item.specified) return item.name;
                });
                // Apply attributes to our fake password field
                $.each(attributes, function(i, attr) {
                    if(input[0][attr] == "password") return;
                    fake.attr( attr, input[0][attr] );
                });
            }
        }
    };
    var supported = !!("placeholder" in document.createElement( "input" ));
    $.fn.placeholder = function() {
        return supported ? this : this.each(function() {
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
})(jQuery);