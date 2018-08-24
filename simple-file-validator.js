function setFileTypesOn(selector, accept, onInvalid) {

	const TYPE_EXT = "ext";
	const TYPE_MIME_ALL = "mime_all";
	const TYPE_MIME_ONLY = "mime_only";

	const EXT_REGEX = /^\.[a-z0-9]+$/;
	const MIME_ALL_REGEX = /^[a-z0-9\-]+\/\*$/;
	const MIME_ONLY_REGEX = /^[a-z0-9\-]+\/[a-z0-9\-]+$/;
	
	const supportedTypes = [];

	var acceptString;

	if (typeof accept == "string") {
		acceptString = accept;
	} else if (typeof accept == "object"
		&& accept.accept 
		&& typeof accept.accept == "string") {
		acceptString = accept.accept;
	}

	if (acceptString) {
		acceptString.toLowerCase()
			.replace(new RegExp(" ", 'g'), "")
			.split(",")
			.forEach(function (acceptStringType) {

				var typeClass, typeValue;

				if (EXT_REGEX.test(acceptStringType)) {
					typeClass = TYPE_EXT;
					typeValue = acceptStringType;
				} else if (MIME_ALL_REGEX.test(acceptStringType)) {
					typeClass = TYPE_MIME_ALL;
					typeValue = acceptStringType.replace("*", "");
				} else if (MIME_ONLY_REGEX.test(acceptStringType)) {
					typeClass = TYPE_MIME_ONLY;
					typeValue = acceptStringType;
				}

				if (typeClass) {
					supportedTypes.push({
						typeClass: typeClass,
						typeValue: typeValue
					});
				} else {
					l("Accpet type is not supported");
				}
			});
    } else {
		l("Accept type(s) not provided");
	}
 
    if (supportedTypes.length) {
        document.querySelectorAll(selector).forEach(attachOnChangeListener);
    } else {
    	l("Accept type(s) not supported");
    }

	function attachOnChangeListener(input) {

		const tagName = input.tagName.toLowerCase();
		const inputType = input.type.toLowerCase();

		if (tagName === "input" && inputType === "file") {
			input.addEventListener("change", checkInput);
			// input.accept = acceptString; // experimental
		} else {
			l("Input type should be file.");
		}
	}

	function checkInput() {

		const files = this.files;

		for (var i = 0; i < files.length; i++) {
			const file = files[i];
			if (!checkInputFileType(file)) {
				onInvalid(this, file);
			}
		}
	}

	function checkInputFileType(file) {

		const name = file.name.toLowerCase();
		var supported = false;

		supportedTypes.forEach(function(type) {

			const typeValue = type.typeValue;

			var cateria = false;

			switch (type.typeClass) {
				case TYPE_EXT:
					cateria = name.endsWith(typeValue);
					break;
				case TYPE_MIME_ONLY:
					cateria = file.type == typeValue;
					break;
				case TYPE_MIME_ALL:
					cateria = file.type.startsWith(typeValue);
					break;
			}

			supported = supported || cateria;

			if (supported) {
				return;
			}
		});

		return supported;
	}

	function l(msg) {
		console.log("[Simple File Validator] " + msg);
	}
}