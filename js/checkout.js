// Exercise 6
function validate() {
	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");

	// Regular Expressions for the specail and neccesary information like nam e,password and email
	const nameRegex = /^[A-Za-z]{3,}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex = /^[A-Za-z0-9]{3,}$/;
	const phoneRegex = /^\d{9,}$/;

	//CSS function for validation:

	function applyStyle(element, isValid) {
		if (isValid) {
			element.style.border = "2px solid green";
		} else {
			element.style.border = "2px solid red";
		}
	}

	// Applying styles to validate the data:

	applyStyle(fName, nameRegex.test(fName.value));
	applyStyle(fEmail, emailRegex.test(fEmail.value));
	applyStyle(fAddress, fAddress.value.length >= 3);
	applyStyle(fLastN, nameRegex.test(fLastN.value));
	applyStyle(fPassword, passwordRegex.test(fPassword.value));
	applyStyle(fPhone, phoneRegex.test(fPhone.value));

	//Ternary operation for the verfiction and get the messages:

	errorName.style.display = nameRegex.test(fName.value) ? "none" : "block";
	errorEmail.style.display = emailRegex.test(fEmail.value) ? "none" : "block";
	errorAddress.style.display = fAddress.value.length >= 3 ? "none" : "block";
	errorLastN.style.display = nameRegex.test(fLastN.value) ? "none" : "block";
	errorPassword.style.display = passwordRegex.test(fPassword.value)? "none": "block";
	errorPhone.style.display = phoneRegex.test(fPhone.value) ? "none" : "block";
}
	function send(){
		if(todoOk == true){
			document.formDatosPersonales.submit();
			alert('Muchas gracias el formulario ha sido enviado correctamente');
		}else{
			alert('Hay errores en el formulario  revise los campos del mismo');
		}
	}

