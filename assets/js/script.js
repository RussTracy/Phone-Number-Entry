// Disable form submissions if there are invalid fields
(function () {
    'use strict'

    // Capture form to apply validation styles
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

