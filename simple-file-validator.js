function setFileTypesOn(selector, types, onInvalid) {

	const fileTypes = {
		image: ['jpg', 'jpeg', 'png'],
		video: ['avi', 'wmv', 'mp4', 'mov', 'flv'],
		audio: ['acc', 'ogg', 'wav', 'm4a', 'mp3'],
		document: ['pdf', 'doc', 'docx']
	};

	var supportedTypes;

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
			const error = checkInputFile(file);
			if (error) {
				onInvalid(this, file);
				this.style.borderColor = "red";
			}
		}
	}

	function checkInputFile(file) {

		const name = file.name.toLowerCase();
		var error = false;

		supportedTypes.forEach(function(type) {
			const ext = "." + type;
			error = error || (!name.endsWith(ext));
			if (error) {
				return;
			}
		});

		return error;
	}

    if (Array.isArray(types)) {
        supportedTypes = types;
    } else if (typeof types == "string") {
    	const type = types.toLowerCase();
    	supportedTypes = fileTypes[type];
    }
    
    if (supportedTypes) {
        document.querySelectorAll(selector).forEach(attachOnChangeListener);
    } else {
    	l("Unknown types");
    }
}