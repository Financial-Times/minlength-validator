describe('MinLength Validator', function() {
    before(function() {
        fixture.setBase('test/fixtures');
    });

    beforeEach(function() {
        fixture.load('fixture.html');
        window.MinLengthValidator.init(fixture.el);
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('should invalidate the element if the value is less than the minlength attribute', function(done) {
        var input = document.getElementById('password');

        input.addEventListener('invalid', function(e) {
            expect(input.validity.valid).to.equal(false);
            expect(input.validationMessage).to.equal('Password must be at least 6 characters long');

            done();
        });

        input.value = '12345';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));
    });

    it('should clear the validation if the value is greater than the minlength attribute', function(done) {
        var input = document.getElementById('password');

        // first invalidate the element
        input.value = '12345';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        input.addEventListener('keyup', function(e) {
            expect(input.validity.valid).to.equal(true);
            expect(input.validationMessage).to.equal('');

            done();
        });

        input.value = '1234567';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));
    });

    it('should clear the validation if the value is equal to the minlength attribute', function(done) {
        var input = document.getElementById('password');

        // first invalidate the element
        input.value = '12345';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        input.addEventListener('keyup', function(e) {
            expect(input.validity.valid).to.equal(true);
            expect(input.validationMessage).to.equal('');

            done();
        });

        input.value = '123456';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));
    });
});