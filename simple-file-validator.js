const SimpleFileValidator = {
	ERROR_TYPE: 1,
	ERROR_MAX_SIZE: 2,
	ERROR_MIN_SIZE: 3
};

function setFileRulesOn(selector, rules) {

	const TYPE_EXT = "ext";
	const TYPE_MIME_ALL = "mime_all";
	const TYPE_MIME_ONLY = "mime_only";

	const REGEX_EXT = /^\.[a-z0-9]+$/;
	const REGEX_MIME_ALL = /^[a-z0-9\-]+\/\*$/;
	const REGEX_MIME_ONLY = /^[a-z0-9\-]+\/[a-z0-9\-]+$/;

	const REGEX_SIZE_IN_KB = /^[0-9\.]+k$/;
	const REGEX_SIZE_IN_MB = /^[0-9\.]+m$/;
	
	if (!(typeof selector === "string" && selector)) {
		l("No valid selector defined");
		return;
	}

	if (!(typeof rules === "object" && rules)) {
		l("No valid rules defined");
		return;
	}

	const supportedTypes = [];

	const accept = rules.accept;

	var minSize = 0;
	var maxSize = 0;

	var onInvalid = function(input, file) {
		l("Invalid input file");
		console.log(input);
		console.log(file);
	};

	if (typeof accept == "string" && accept) {
		accept.toLowerCase()
			.replace(new RegExp(" ", 'g'), "")
			.split(",")
			.forEach(function (acceptStringType) {

				var typeClass, typeValue;

				if (REGEX_EXT.test(acceptStringType)) {
					typeClass = TYPE_EXT;
					typeValue = acceptStringType;
				} else if (REGEX_MIME_ALL.test(acceptStringType)) {
					typeClass = TYPE_MIME_ALL;
					typeValue = acceptStringType.replace("*", "");
				} else if (REGEX_MIME_ONLY.test(acceptStringType)) {
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
		l("No proper accept rule defined");
	}
	
	if (rules.maxSize) {
		maxSize = getSizeInBytes(rules.maxSize);
	}

	if (rules.minSize) {
		minSize = getSizeInBytes(rules.minSize);
	}
 
	if (typeof rules.onInvalid === "function") {
		onInvalid = rules.onInvalid;
	}

	document.querySelectorAll(selector).forEach(attachOnChangeListener);

	function attachOnChangeListener(input) {

		const tagName = input.tagName.toLowerCase();
		const inputType = input.type.toLowerCase();

		if (tagName === "input" && inputType === "file") {
			input.addEventListener("change", checkInput);
			// apply the accept rule to file input element
			input.accept = accept;
			// check if required is defined and set
			if (rules.required) {
				// apply the required rule
				input.required = true;
			}
		} else {
			l("Input type should be file.");
		}
	}

	function checkInput() {

		const files = this.files;

		for (var i = 0; i < files.length; i++) {
			const file = files[i];

			const fileTypeError = checkInputFileType(file);

			const fileSizeError = checkInputFileSize(file);

			if (fileTypeError) {
				onInvalid(this, file, fileTypeError);
			} else if (fileSizeError) {
				onInvalid(this, file, fileSizeError);
			}
		}
	}

	function checkInputFileType(file) {

		const name = file.name.toLowerCase();
		var error = SimpleFileValidator.ERROR_TYPE;

		supportedTypes.every(function(type) {

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

			if (cateria) {
				error = false;
				return false;
			}
			return true;
		});

		return error;
	}

	function checkInputFileSize(file) {

		const fileSize = file.size;

		if (minSize && fileSize < minSize) {
			return SimpleFileValidator.ERROR_MIN_SIZE;
		} else if (maxSize && fileSize > maxSize) {
			return SimpleFileValidator.ERROR_MAX_SIZE;
		}

		return false;
	}

	function getSizeInBytes(size) {
		if (typeof size === "number") {
			return size;
		} else if (typeof size === "string") {

			const actualSize = size.replace(new RegExp(" ", 'g'), "");

			const isMb = REGEX_SIZE_IN_MB.test(actualSize);
			const isKb = REGEX_SIZE_IN_KB.test(actualSize);

			if (isMb || isKb) {
				var sizeInBytes = Number(actualSize.substring(0, actualSize.length - 1));
				sizeInBytes *= 1024;
				if (isMb) {
					sizeInBytes *= 1024;
				}
				return sizeInBytes;
			}
		}
		return 0;
	}

	function l(msg) {
		console.log("[Simple File Validator] " + msg);
	}
}