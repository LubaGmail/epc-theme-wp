//CMS Validation library

$(document).ready(function() {

	//Initialize dropdowns' validation
	$('.cms-regreq-field-dd, .cms-mpreq-field-dd').on("focus", function() {
		$(this).attr('required', true);
	});

	// Fields to be validated require either class 'cms-regreq-field' for text fields of class 'cms-regreq-field-dd' for dropdowns as well as the 'required' attribute.

	//The following classes will validate for empty when applied to a field.
	//Use  'cms-regreq-field' for adaptive fields.
	//Use  'cms-register-fields-req' for non-adaptive fields ie. forgot password, security questions.
	//Use  'cms-mp-fields-req' for non-adaptive fields in my profile.
	//Use  'cms-mpreq-field-mfa' for adaptive fields in my profile under register MFA section.
	//Use 'cms-req-field' for non-adaptive, basic field ie. forgot pasword module.
	//Use  'cms-regreq-field-dd' for dropdowns.

	var reqItems = $('.cms-regreq-field, .cms-register-fields-req, .cms-mp-fields-req, .cms-mpreq-field-mfa, .cms-mpreq-field, .cms-req-field, .cms-regreq-field-dd, .cms-mpreq-field-dd');


	$(reqItems).on('blur change', function() {
		//check if required attribute is set and validate if so
		if ($(this).prop('required')) {
			//Create error message if field is empty and no error is already present
			if (!$(this).val() && $(this).parent().find('span.cms-inline-error ').length < 1) {
				//Getting the title of the input.
				var title = $(this).attr('title');
				var id = $(this).attr('id');
				//Adding red border to field
				$(this).addClass("cms-error-border");
				//Appending error to container after 1st element which is the input field via global variable
				var fieldError = '<span id="' + id + '-error" class="cms-inline-error cms-error" aria-role="alert"><span class="sr-only">Error:</span> ' + title + ' is a required field.</span>';
				$(this).parent().append(fieldError);
				//Appending to alert-box
				idb = '' + id + '-error-508';
				if ($('#cms-alert-box').find('span#' + idb + '').length < 1) {
					//Error and Icon - <i class="fa fa-exclamation-circle" aria-hidden="true"></i><span class="sr-only">Error:</span> 
					var errorBox = '<span id="' + idb + '" class="cms-req-error cms-error" aria-role="alert"><a href="#' + id + '" class="cms-error-alert-link">' + title + '</a> is a required field.</span>';
					$('#cms-alert-box').append(errorBox);
					//console.log('#' + idb + ' appended!');
				}
			} else if ($(this).val()) {
				var ids = $(this).attr('id');
				$(this).removeClass("cms-error-border");
				$(this).parent().find('#' + ids + '-error').remove();
				//console.log('#' + ids + '-error removed!');
				$('#cms-alert-box').find('#' + ids + '-error-508').remove();
				//console.log('#' + ids + '-error-508 removed!');
			}
		} else {
			//Don't validate if 'required' attribute is not set 
		}
		//Show the alert Box depending on number of errors and add role for 508 compliance.
		var $numItems = $('.cms-req-error.cms-error');
		//console.log($numItems);
		if ($numItems.length > 0) {
			//Show alert box if count is larger than 0
			//$('#cms-alert-box-container').removeClass('hide').attr('role', 'alert');
			//$('#cms-alert-box').removeClass('hide');
			// console.log($numItems.length);
		} else if ($numItems.length === 0) {
			//Hide alert box if count is 0
			$('#cms-alert-box-container').addClass('cms-hide').removeAttr('role');
			$('#cms-alert-box').addClass('cms-hide');
			//Show next screen in the case of new user registration.
		}
	});

	//Checking if numeric value for phone number // Add class 'cms-phone' to a field to validate.
	$(".cms-check-phone").blur(function() {
		var id = $(this).attr('id');
		//Only validate if the field is not empty
		if ($(this).val()) {
			if ($.isNumeric($(this).val()) && $(this).val().length === 10) {
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Enter a valid Phone Number with a minimum of 10 digits.</span>');
					$(this).addClass("cms-error-border-format");
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Checking if numeric value for phone number // Add class 'cms-checknum' to a field to validate.
	$(".cms-check-num").blur(function() {
		var id = $(this).attr('id');
		//Only validate if the field is not empty
		if ($(this).val()) {
			if ($.isNumeric($(this).val())) {
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Enter a valid Primary Phone Number.</span>');
					$(this).addClass("cms-error-border-format");
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Check minimum 10 characters for phone numbers. - Will phase out based on updated .cms-checkphone function.
	$(".cms-checkmin10").blur(function() {
		var id = $(this).attr('id');
		//Only validate if the field is not empty
		if ($(this).val()) {
			if ($(this).val().length === 10) {
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Phone number must contain a minimum of 10 characters.</span>');
					$(this).addClass('cms-error-border');
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Check minimum 8 characters for passwords.
	$(".cms-checkmin8").blur(function() {
		var id = $(this).attr('id');
		//Only validate if the field is not empty
		if ($(this).val()) {
			if ($(this).val().length >= 8) {
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Password must contain a minimum of 8 characters.</span>');
					$(this).addClass('cms-error-border');
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});
	
	//Passwords restrict copy+paste
	$('#cms-user-password-sg, #cms-user-password-conf-sg').on("copy paste", function(e) {
		//console.log('Copy/Paste detected!');
		e.preventDefault();
		return false;
	});

	//Check minimum 6 characters for userid.
	// $(".cms-checkmin6").blur(function() {
	// 	var id = $(this).attr('id');
	// 	//Only validate if the field is not empty
	// 	if ($(this).val()) {
	// 		if ($(this).val().length >= 6) {
	// 			$(this).parent().find('span.cms-inline-error-format').remove();
	// 			$(this).removeClass('cms-error-border');
	// 		} else {
	// 			if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
	// 				$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> User ID must contain a minimum of 6 characters.</span>');
	// 				$(this).addClass('cms-error-border');
	// 			}
	// 		}
	// 	} else if (!$(this).val()) {
	// 		$(this).parent().find('span.cms-inline-error-format').remove();
	// 		$(this).removeClass('cms-error-border-format');
	// 		//Not validating
	// 	}
	// });

	//Checking if numeric value for zip code // Add class 'cms-check-zip' to a field to validate.
	$(".cms-check-zip").blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			if ($.isNumeric($(this).val())) {
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Enter a valid Zip Code.</span>');
					$(this).addClass("cms-error-border-format");
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Checking foreign zip code // Add class 'cms-check-zip-foreign to a field to validate.
	$(".cms-check-zip-foreign").blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			var AlphaNum = $(this).val();
			if (validateAlphaNum(AlphaNum)) {
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Enter a valid Zip/Postal Code using only alphanumeric characters.</span>');
					$(this).addClass("cms-error-border-format");
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Checking if numeric value for SSN and has 9 digits// Add class 'cms-check-ssn' to a field to validate.
	$(".cms-check-ssn").blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			if ($.isNumeric($(this).val()) && $(this).val().length === 9) {
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Enter a valid Social Security Number.</span>');
					$(this).addClass("cms-error-border-format");
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Checking for alphabetical characters on names ie. Fist Name, Last // Add class '.cms-checkalpha-name'
	$('.cms-checkalpha-name').blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			var Alpha = $(this).val();
			var title = $(this).attr('title');
			if (validateAlpha(Alpha)) {
				//console.log('Email is valid');
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error">Invalid Format: Please enter your ' + title + ' using only alphabetical characters.</span>');
					$(this).addClass('cms-error-border-format');
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Checking for alphabetical characters on  Middle name  // Add class '.cms-checkalpha-middlename'
	$('.cms-checkalpha-middlename').blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			var MiddleName = $(this).val();
			var title = $(this).attr('title');
			if (validateMiddleName(MiddleName)) {
				//console.log('Email is valid');
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error">Invalid Format: Please enter your ' + title + ' using only alphabetical characters, &#39; and &#45; are allowed.</span>');
					$(this).addClass('cms-error-border-format');
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Checking for alphanumerical characters on security questions // Add class '.cms-checkalphanum-secquest'
	$('.cms-checkalphanum-secquest').blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			var AlphaNum = $(this).val();
			var title = $(this).attr('title');
			if (validateAlphaNum(AlphaNum)) {
				//console.log('Email is valid');
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Answer to Challenge Question using only alphanumeric characters.</span>');
					$(this).addClass('cms-error-border-format');
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Checking for alphabetical characters on addresses ie. city, country // Add class '.cms-checkalpha-geo'
	$('.cms-checkalpha-geo').blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			var Alpha = $(this).val();
			var title = $(this).attr('title');
			if (validateAlpha(Alpha)) {
				//console.log('Email is valid');
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Enter a valid ' + title + ' using only alphabetical characters.</span>');
					$(this).addClass('cms-error-border-format');
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Checking for alphanumeric characters on addresses ie. home address // Add class '.cms-checkalphanum-geo'
	$('.cms-checkalphanum-geo').blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			var AlphaNum = $(this).val();
			var title = $(this).attr('title');
			if (validateAlphaNum(AlphaNum)) {
				//console.log('Email is valid');
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Enter a valid ' + title + ' using only alphanumeric characters. </span>');
					$(this).addClass('cms-error-border-format');
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Validate User IDs for alphanumeric values and only allow _ @ . ' -
	$('.cms-userid-field').blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			var UserID = $(this).val();
			var title = $(this).attr('title');
			if (validateUserID(UserID)) {
				//console.log('Email is valid');
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Enter a valid ' + title + ' using only alphanumeric characters and allowed special characters.</span>');
					$(this).addClass('cms-error-border-format');
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Validate e-mail format // Add class 'cms-check-email' to a field to validate. 2nd class used to avoid conflict in case of NUR
	$('.cms-check-email, .cms-check-email2').blur(function() {
		var id = $(this).attr('id');
		if ($(this).val()) {
			var sEmail = $(this).val();
			if (validateEmail(sEmail)) {
				//console.log('Email is valid');
				$(this).parent().find('span.cms-inline-error-format').remove();
				$(this).removeClass('cms-error-border-format');
			} else {
				if ($(this).parent().find('span.cms-inline-error-format').length < 1) {
					$(this).parent().append('<span id="' + id + '-error-format" class="cms-inline-error-format cms-error"><span class="sr-only">Error:</span> Invalid format. Enter a valid E-mail address. </span>');
					$(this).addClass('cms-error-border-format');
				}
			}
		} else if (!$(this).val()) {
			$(this).parent().find('span.cms-inline-error-format').remove();
			$(this).removeClass('cms-error-border-format');
			//Not validating
		}
	});

	//Disable submit button if e-mail validation fails for subscribe modal.
	$('#cms-sign-up').blur(function() {
		if ($(this).parent().find('.cms-inline-error-format').length) { // return's true if element is present
			// show or hide view all apps element in header.
			$('#cms-subscribe-btn-modal').prop("disabled", true);
		} else {
			$('#cms-subscribe-btn-modal').prop("disabled", false);
		}
	});

	//Reset fields when modal is dismissed.
	$('#cms-modal-subscribe').on('hidden.bs.modal', function() {
		$(this).find('#cms-sign-up').val('').removeClass('cms-error-border-format');
		$(this).find('#cms-subscribe-btn-modal').prop("disabled", false);
		$(this).find('span.cms-inline-error-format').remove();
	});

	//Alerts

	//Adding EIDM #sadDiv markup along with attributes. only markup needed is <div id="sadDIVConainer"></div>
	$("#sadDIVContainer").addClass('cms-alert-error container alert cms-hide').attr('role', 'alert')
		.append('<h2 class="cms-h2-interior col-xs-12"><i class="fa fa-times-circle" aria-hidden="true"></i>Error<a href="#" class="close cms-error-close" data-dismiss="alert" aria-label="close" title="close">&times;</a></h2><span id="sadDIV" class="col-xs-12"><!-- Errors are displayed here. --></span>');

});

//Functions for validation. 

//Validate e-mail format function.
function validateEmail(sEmail) {
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (filter.test(sEmail)) {
		return true;
	} else {
		return false;
	}
}

//Validate numeric values.
function validateNumeric(Numeric) {
	var filter = /^(0|[1-9][0-9]*)$/;
	if (filter.test(Numeric)) {
		return true;
	} else {
		return false;
	}
}

//Validate for alpha values no numbers, allows spaces.
function validateAlpha(Alpha) {
	var filter = /^[a-zA-Z() ]+$/;
	if (filter.test(Alpha)) {
		return true;
	} else {
		return false;
	}
}

//Validate for alphanumeric values
function validateAlphaNum(AlphaNum) {
	var filter = /^[A-Za-z0-9 _.-]+$/;
	if (filter.test(AlphaNum)) {
		return true;
	} else {
		return false;
	}
}

//Validate User IDs for alphanumeric values and only allow _ @ . ' - 
function validateUserID(UserID) {
	var filter = /^[ A-Za-z0-9_@.'-]*$/;
	if (filter.test(UserID)) {
		return true;
	} else {
		return false;
	}
}

//Validate User Middle Name for alpha values and only allow ' - 
function validateMiddleName(MiddleName) {
	var filter = /^[ A-Za-z-'-]*$/;
	if (filter.test(MiddleName)) {
		return true;
	} else {
		return false;
	}
}

//Select2
function format(state) {
	if (!state.id) return state.text; // optgroup
	return state.text;
}