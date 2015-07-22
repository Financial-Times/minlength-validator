(function(root) {
    function validate() {
        var value = this.el.value;

        if (!value) {
            return;
        }

        if (value.length < this.minLength) {
            this.el.setCustomValidity(this.message);
            this.el.dispatchEvent(new Event('invalid', {
                bubbles: false,
                cancelable: true
            }));
        }
    }

    function compile(el) {
        var config = {
            minLength: el.getAttribute('minlength'),
            message: el.getAttribute('minlength-validator-message')
        };

        return new MinLengthValidator(el, config);
    }

    function MinLengthValidator(el, config) {
        if (!(this instanceof MinLengthValidator)) {
            return new MinLengthValidator(el, config);
        }

        this.el = el;
        this.minLength = config.minLength;
        this.message = config.message;

        this.el.addEventListener('keyup', validate.bind(this));
    }

    MinLengthValidator.init = function(rootEl) {
        var selector = '[minlength]';

        if (rootEl.matches(selector)) {
            return compile(rootEl);
        }

        var nodes = rootEl.querySelectorAll(selector);
        var validators = [];
        var i = nodes.length;

        while (i--) {
            validators.push(compile(nodes[i]));
        }

        return validators;
    };

    if (typeof exports === 'object') {
        module.exports = MinLengthValidator;
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return MinLengthValidator;
        });
    } else {
        root.MinLengthValidator = MinLengthValidator;
    }
})(this);