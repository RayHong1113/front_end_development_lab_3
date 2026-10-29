/*
	Registration Form Validation
	October 29, 2026
	Ray Hong
 */

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
const validate = (e) => {
	//	Hides all error elements on the page
	hideAllErrors();

	//	Determine if the form has errors
	if (formHasErrors()) {
		// 	Prevents the form from submitting
		e.preventDefault();
		return false;
	}

	return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
const formHasErrors = () => {
	let errorFlag = false

	const requiredTextFields = ["fname", "lname", "email"]

	//	Loop through the text fields and check to see the user entered a value
	for (const field of requiredTextFields) {
		let textField = document.getElementById(field)

		//	Determine if the user entered text
		if (!formFieldHasInput(textField)) {
			document.getElementById(field + "_error").style.display = "block"
			textField.classList.add("input_error")

			//	Determine if this is the first error
			if (!errorFlag) {
				textField.focus()
			}

			//	Raise the error flag indicating an error
			errorFlag = true
		}
	}

	//	Validate email format
	const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
	let emailField = document.getElementById("email")

	if (!emailRegex.test(emailField.value)) {
		document.getElementById("email_error").style.display = "block"
		emailField.classList.add("input_error")

		if (!errorFlag) {
			emailField.focus()
			emailField.select()
		}

		errorFlag = true
	}

	//	Check to ensure the user selected a status
	const statuses = ["student", "employee", "other"]
	let statusChecked = false

	for (const statusId of statuses) {
		if (document.getElementById(statusId).checked) {
			statusChecked = true
		}
	}

	if (!statusChecked) {
		document.getElementById("status_error").style.display = "block"
		errorFlag = true
	}

	//	Validate school name if Student is selected
	if (document.getElementById("student").checked) {
		let schoolField = document.getElementById("school")

		if (!formFieldHasInput(schoolField)) {
			document.getElementById("school_error").style.display = "block"
			schoolField.classList.add("input_error")

			if (!errorFlag) {
				schoolField.focus()
			}

			errorFlag = true
		}
	}

	//	Validate company name and address if Employed is selected
	if (document.getElementById("employee").checked) {
		const companyFields = ["company", "companyaddress"]

		for (const field of companyFields) {
			let companyField = document.getElementById(field)

			if (!formFieldHasInput(companyField)) {
				document.getElementById(field + "_error").style.display = "block"
				companyField.classList.add("input_error")

				if (!errorFlag) {
					companyField.focus()
				}

				errorFlag = true
			}
		}
	}

	//	Validate dropdown selection (Preferred Session)
	let sessionField = document.getElementById("session")
	if (sessionField.value === "" || sessionField.value == null) {
		document.getElementById("session_error").style.display = "block"
		sessionField.classList.add("input_error")

		if (!errorFlag) {
			sessionField.focus()
		}

		errorFlag = true
	}

	//	Validate number input (Number of Tickets: 1 - 5)
	let ticketsField = document.getElementById("tickets")
	let ticketsValue = parseInt(ticketsField.value, 10)

	if (isNaN(ticketsValue) || ticketsValue < 1 || ticketsValue > 5) {
		document.getElementById("tickets_error").style.display = "block"
		ticketsField.classList.add("input_error")

		if (!errorFlag) {
			ticketsField.focus()
		}

		errorFlag = true
	}

	//	Validate checkboxes (Topics of Interest: at least one checked)
	const topicCheckboxes = document.querySelectorAll("input[name='topic']")
	let topicChecked = false

	for (const checkbox of topicCheckboxes) {
		if (checkbox.checked) {
			topicChecked = true
			break
		}
	}

	if (!topicChecked) {
		document.getElementById("topic_error").style.display = "block"

		if (!errorFlag) {
			topicCheckboxes[0].focus()
		}

		errorFlag = true
	}

	console.log("Errors found:", errorFlag);

	return errorFlag
}

/*
 * Resets (hides) all of the error messages and removes error border styles on the page.
 */
const hideAllErrors = () => {
	const errorFields = document.getElementsByClassName("error")

	for (const field of errorFields) {
		field.style.display = "none"
	}

	// Remove red error border from all input and select elements
	const inputsWithErrors = document.querySelectorAll(".input_error")
	for (const input of inputsWithErrors) {
		input.classList.remove("input_error")
	}
}

/*
 * Handles the click event for status radio buttons that require extra details.
 *
 * param status  The id of the radio button that was clicked ("student" or "employee")
 */
const showDetails = (status) => {
	//	Ensure the heading is being displayed
	document.getElementById("Details").style.display = "block"

	if (status === "student") {
		document.getElementById("companydiv").style.display = "none"
		document.getElementById("company").value = ""
		document.getElementById("companyaddress").value = ""
		document.getElementById("company").classList.remove("input_error")
		document.getElementById("companyaddress").classList.remove("input_error")

		document.getElementById("schooldiv").style.display = "block"
		document.getElementById("school").value = ""
		document.getElementById("school").focus()
	} else if (status === "employee") {
		document.getElementById("schooldiv").style.display = "none"
		document.getElementById("school").value = ""
		document.getElementById("school").classList.remove("input_error")

		document.getElementById("companydiv").style.display = "block"
		document.getElementById("company").value = ""
		document.getElementById("companyaddress").value = ""
		document.getElementById("company").focus()
	}
}

/*
 * Hides elements in the Detail Information section of the page
 */
const hideDetails = () => {
	document.getElementById("Details").style.display = "none"
	document.getElementById("schooldiv").style.display = "none"
	document.getElementById("companydiv").style.display = "none"

	document.getElementById("school").classList.remove("input_error")
	document.getElementById("company").classList.remove("input_error")
	document.getElementById("companyaddress").classList.remove("input_error")
}

/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event
 * return  True allows the reset to happen; False prevents
 *         the browser from resetting the form.
 */
const resetForm = (e) => {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear form?')) {
		// Ensure all error fields and detail sections are hidden
		hideAllErrors();
		hideDetails();

		// Set focus to the first text field on the page
		document.getElementById("fname").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
const formFieldHasInput = (fieldElement) => {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

// Add the event listener for the document load
document.addEventListener("DOMContentLoaded", () => {
	// Hide all error messages and detail fields on initial load
	hideAllErrors();
	hideDetails();

	// Add event listener for the form submit
	document.getElementById("eventRegistrationForm").addEventListener("submit", validate);

	// Reset the form using the default browser reset
	// This is done to ensure the radio buttons are unchecked when the page is refreshed
	// This line of code must be done before attaching the event listener for the customer reset
	document.getElementById("eventRegistrationForm").reset();

	// Add event listener for our custom form reset function
	document.getElementById("eventRegistrationForm").addEventListener("reset", resetForm);

	// Add event listeners for the radio buttons
	document.getElementById("student").addEventListener("click", () => {
		showDetails("student")
	})
	document.getElementById("employee").addEventListener("click", () => {
		showDetails("employee")
	})
	document.getElementById("other").addEventListener("click", hideDetails)
});
