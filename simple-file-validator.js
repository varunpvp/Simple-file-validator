function setFileTypesOn(selector, accept, onInvalid) {

	const supportedTypes = [];

	function l(msg) {
		console.log("[Simple File Validator] " + msg);
	}

	function attachOnChangeListener(input) {

		const tagName = input.tagName.toLowerCase();
		const inputType = input.type.toLowerCase();

		if (tagName === "input" && inputType === "file") {
			input.addEventListener("change", checkInput);
		} else {
			l("Input type should be file.");
		}
	}

	function checkInput() {

		const files = this.files;

		for (var i = 0; i < files.length; i++) {
			const file = files[i];
			if (!checkInputFile(file)) {
				onInvalid(this, file);
				// this.style.borderColor = "red";
			}
		}
	}

	function checkInputFile(file) {

		const name = file.name.toLowerCase();
		var supported = false;

		supportedTypes.forEach(function(type) {
			if (type.indexOf(".") != -1) {
				supported = supported || name.endsWith(type);
			} else if (type.indexOf("/") != -1) {
				if (type.indexOf("*") != -1) {
					supported = supported || file.type == type.replace("*", "");
				} else {
					supported = supported || file.type == type;
				}
			} else {
				l(type + ": Unsupported type specified");
			}

			if (supported) {
				return;
			}
		});

		return supported;
	}

    if (typeof accept == "string") {
		accept.toLowerCase()
			.replace(new RegExp(" ", 'g'), "")
			.split(",")
			.forEach(function (item) {
				supportedTypes.push(item);
			});
    } else {
		l("Accpet type is not a string");
	}
    
    if (supportedTypes.length) {
        document.querySelectorAll(selector).forEach(attachOnChangeListener);
    } else {
    	l("Accept not supported");
    }
}