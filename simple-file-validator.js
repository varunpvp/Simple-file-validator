function setFileTypesOn(selector, types, onInvalid, resetToNone = true) {

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
			input.addEventListener("change", checkFileTypeSupport);
		} else {
			l("Input type should be file.");
		}
	}

	function checkFileTypeSupport() {

		const value = this.value.toLowerCase();
		var supported = false;

		supportedTypes.forEach(function(type) {
			const ext = "." + type;
			supported = supported || value.endsWith(ext);
			if (supported) {
				return;
			}
		});

		if (!supported) {
			onInvalid(this);
			if (resetToNone) {
				this.value = "";
			}
		}
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