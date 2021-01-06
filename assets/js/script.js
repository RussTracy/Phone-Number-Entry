var formEl = document.querySelector("#phone-form")
var phoneNumberInputEl = document.querySelector("#phone");
var phoneNumberDisplayEl = document.querySelector("#phone-numbers");

// Function to display error message
function displayError(elementId, errorMessage) {
    document.getElementById(elementId).innerHTML = errorMessage;
}

// Function to submit and validate form
function formSubmitHandler(event) {

    event.preventDefault();

    // Get only numbers from phone number field value
    var phoneNumber = ('' + phoneNumberInputEl.value).replace(/\D/g, '')


    // Set phone form error to true
    var phoneError = true;

    // Validate phone number
    if (phoneNumber == "") {
        displayError("phoneError", "Please enter your phone number");
        formEl.classList.add('was-validated');
    }
    else {
        var regex = /^[2-9]\d{9}$/; // Phone number cannot start with a 1 or 0 and must be 10 digits in length
        if (regex.test(phoneNumber) === false) {
            displayError("phoneError", "Please enter a valid 10 digit phone number");
            formEl.classList.add('was-validated');
        }
        else {
            displayError("phoneError", "");
            phoneError = false;
        }
    }

    // Prevent the form from being submitted if there are any errors
    if ((phoneError) == true) {
        return false;
    }
    else {
        formatPhoneNumber(phoneNumber) // Send phone number to be formatted for display
        localStorage.setItem("phoneNumbers", JSON.stringify(phoneNumber)); // Store unformatted number as digits only
        phoneNumberDisplayEl.innerHTML = formattedPhoneNumber; // Display formatted number on screen
        phoneNumberInputEl.value = ""; // Reset form field
        formEl.classList.remove("was-validated"); // Reset form validation
    }
};

// Clean and format phone number as needed
function formatPhoneNumber(phoneNumber) {
    var cleanNumber = ('' + phoneNumber).replace(/\D/g, '')
    var match = cleanNumber.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        formattedPhoneNumber = '(' + match[1] + ') ' + match[2] + '-' + match[3];
        console.log(formattedPhoneNumber);
        return formattedPhoneNumber;
    }
    return null
}

// Load phone number from local storage and test for proper length
var loadPhoneNumber = function () {
    phoneNumber = JSON.parse(localStorage.getItem("phoneNumbers"));
    if (phoneNumber) {
        if (phoneNumber.length < 10) {
            console.log('Phone Number is too short!');
            return;
        }
        if (phoneNumber.length > 10) {
            console.log('Phone Number is too long!');
            return;
        }
        // Format phone number and display on page
        formatPhoneNumber(phoneNumber);
        phoneNumberDisplayEl.innerHTML = formattedPhoneNumber;
        phoneNumberInputEl.value = formattedPhoneNumber
    }

}

formEl.addEventListener("submit", formSubmitHandler);

loadPhoneNumber();