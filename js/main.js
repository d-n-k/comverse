// comverse JS 

window.onload = function() {
	// contact form validation func
	// define vars
	var form = document.getElementById("contact_form");
		form.setAttribute("novalidate", "");
	var	submitBtn = document.getElementById("submit-btn"),
		errorMsg = document.querySelectorAll(".errorHandling"),
	    requiredFields = document.querySelectorAll("[required]");
	
	for (var i = 0; i<errorMsg.length; i++) {
		errorMsg[i].style.display = "none";
	}
	// add event listner to submit btn
	submitBtn.addEventListener("click", validate);

	// RegExp function to check valid email string
	function isValidEmailAddress(emailAddress) {
	    var pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	    return pattern.test(emailAddress);
	}
	// define the validate on type function
	function validateString(e){
		var isValid = true,
		    emailStr = document.getElementById("email").value;
	    if(this.value === ""){
				this.nextElementSibling.style.display = "block";
				this.classList.add("error");
	    }
		if(this.value !== ""){
			this.nextElementSibling.style.display = "none";
			this.classList.remove("error");
		}
		if(this.id === "email"){
			if(this.value !== ""){
				if(!isValidEmailAddress(emailStr)){
					this.nextElementSibling.style.display = "block";
					this.nextElementSibling.textContent = "try using the regular 'ol \"address@domain.com\"";
					this.classList.add("error");
				}else{
					this.nextElementSibling.style.display = "none";
					this.classList.remove("error");
				}
			}
	    }
	}
	// define the validate on submit function
	function validate(e) {
		// define vars
		var firstError = null,
		    isValid = true,
		    emailStr = document.getElementById("email").value;
	    // run on all required and define current
		for(var i = 0; i<requiredFields.length; i++) {
			oneError = requiredFields[i];
			oneError.addEventListener("keyup", validateString);

			// check if the input is empty
			if (oneError.value === "") {
				// if more than one is empty 
		        if (firstError === null){
		          firstError = i;
		        }
		        // add indication to the user
				errorMsg[i].style.display = "block";
				oneError.classList.add("error");
				isValid = false;
		        if (firstError === i) {
		          oneError.focus();
		        }
			}else{
				errorMsg[i].style.display = "none";
				oneError.classList.remove("error");
			}
			// if the empty input is email
			if (oneError.id === "email") {
				if (oneError.value !== "") {
					if (!isValidEmailAddress(emailStr)) {
							errorMsg[i].style.display = "block";
							errorMsg[i].textContent = "try using the regular 'ol \"address@domain.com\"";
							oneError.classList.add("error");
							oneError.focus();
							isValid = false;
				    }else{
						errorMsg[i].style.display = "none";
						oneError.classList.remove("error");
						isvalid = true;
					}
			    }
			}
			//if input value is not empty
			if (oneError.value !== "" && oneError.id !== "email") {
				errorMsg[i].style.display = "none";
				oneError.classList.remove("error");
			}
		}

		if(!isValid){
			e.preventDefault();
		}
		// if all required fields have values - create and display success message
		if (isValid) {
			var successMsgContainer = document.createElement("div");
			var span = document.createElement("span");
			var successMsg = document.createTextNode("Great! your form has been sent");
			span.appendChild(successMsg);
			successMsgContainer.appendChild(span);
			successMsgContainer.classList.add("successMsg");
			form.appendChild(successMsgContainer);
		}
	}
	// end validate function
	// end contact form validation func
}();
