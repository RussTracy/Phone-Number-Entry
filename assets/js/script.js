const formEl = document.querySelector("#phone-form")
const phoneNumberInputEl = document.querySelector("#phone");
const placeholderEl = document.querySelector("#placeholder")
const phoneNumberDisplayEl = document.querySelector("#phone-numbers");

// Function to display error message
const displayError = (elementId, errorMessage) => {
    document.getElementById(elementId).innerHTML = errorMessage;
}

// Function to submit and validate form
const formSubmitHandler = (event) => {

    event.preventDefault();

    // Get only numbers from phone number field value
    let phoneNumber = ('' + phoneNumberInputEl.value).replace(/\D/g, '')

    // Set phone form error to true
    let phoneError = true;

    // Validate phone number
    if (phoneNumber === "") {
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
        placeholderEl.textContent = "(___) ___-____"; // Reset placeholder text
        formEl.classList.remove("was-validated"); // Reset form validation
    }
};

// Clean and format phone number as needed
const formatPhoneNumber = (phoneNumber) => {
    let cleanNumber = ('' + phoneNumber).replace(/\D/g, '')
    let match = cleanNumber.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        formattedPhoneNumber = '(' + match[1] + ') ' + match[2] + '-' + match[3];
        return formattedPhoneNumber;
    }
    return null
}

// Load phone number from local storage and test for proper length
const loadPhoneNumber = () => {
    phoneNumber = JSON.parse(localStorage.getItem("phoneNumbers"));
    if (phoneNumber) {
        // If phone number in local storage is too short, log error and do not display number
        if (phoneNumber.length < 10) {
            console.log('Phone Number is too short!');
            return null;
        }
        // If phone number in local storage is too long, log error and do not display number
        if (phoneNumber.length > 10) {
            console.log('Phone Number is too long!');
            return null;
        }
        // Format phone number and display on page
        formatPhoneNumber(phoneNumber);
        phoneNumberDisplayEl.innerHTML = formattedPhoneNumber;
        placeholderEl.textContent = formattedPhoneNumber;
        phoneNumberInputEl.value = phoneNumber;
    }

}

// Phone field placeholder function
const fieldPlaceHolder = () => {
    let number = ('' + phoneNumberInputEl.value).replace(/\D/g, ''); // Remove any non-digit entries

    if (number.length === 0) {
        placeholderEl.textContent = "(___) ___-____";
        phoneNumberInputEl.value = number; // If user enters symbols or letters, remove them and return field value to numeric state
    }
    if (number.length === 1) {
        let match = number.match(/^(\d{1})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + "__) ___-____";
        phoneNumberInputEl.value = number;
    }
    if (number.length === 2) {
        match = number.match(/^(\d{2})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + "_) ___-____";
        phoneNumberInputEl.value = number;
    }
    if (number.length === 3) {
        match = number.match(/^(\d{3})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + ") ___-____";
        phoneNumberInputEl.value = number;
    }
    if (number.length === 4) {
        match = number.match(/^(\d{3})(\d{1})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + ") " + match[2] + "__-____";
        phoneNumberInputEl.value = number;
    }
    if (number.length === 5) {
        match = number.match(/^(\d{3})(\d{2})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + ") " + match[2] + "_-____";
        phoneNumberInputEl.value = number;
    }
    if (number.length === 6) {
        match = number.match(/^(\d{3})(\d{3})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + ") " + match[2] + "-____";
        phoneNumberInputEl.value = number;
    }
    if (number.length === 7) {
        match = number.match(/^(\d{3})(\d{3})(\d{1})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + ") " + match[2] + "-" + match[3] + "___";
        phoneNumberInputEl.value = number;
    }
    if (number.length === 8) {
        match = number.match(/^(\d{3})(\d{3})(\d{2})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + ") " + match[2] + "-" + match[3] + "__";
        phoneNumberInputEl.value = number;
    }
    if (number.length === 9) {
        match = number.match(/^(\d{3})(\d{3})(\d{3})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + ") " + match[2] + "-" + match[3] + "_";
        phoneNumberInputEl.value = number;
    }
    if (number.length === 10) {
        match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
        placeholderEl.textContent = "";
        placeholderEl.textContent = "(" + match[1] + ") " + match[2] + "-" + match[3];
        phoneNumberInputEl.value = number;
    }
}

formEl.addEventListener("submit", formSubmitHandler);
phoneNumberInputEl.addEventListener("keyup", fieldPlaceHolder);

loadPhoneNumber();