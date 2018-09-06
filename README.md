# Simple-file-validator

A simple file validator for input file on web pages, No plugin or addons required.

## Usage

	setFileRulesOn("#dp" /* any valid selector */, {
		accept: "image/*", // file types to be allowed
		minSize: "10k", // min size of file
		maxSize: "50k", // max size of file
		onInvalid: imageInvalid // function to be called with (input, file, errorCode)
	});

	setFileRulesOn(".cover", {
		accept: ".jpg, .jpeg", 
		onInvalid: imageInvalid
	});

	setFileRulesOn("#intro", {
		accept: ".webm,video/mp4",
		maxSize: "20m",
		onInvalid: videoInvalid 
	});

	setFileRulesOn("#theme", { 
		accept: "audio/mp3, .wav", 
		maxSize: "6m",
		onInvalid: audioInvalid
	});

## Params

`selector` - valid input file type selector, it can be any CSS selector

`rules` - set of rules which will be applied to input file

## Methods

`setFileRulesOn` - apply set of rules to files by using selector

## Constants

`SimpleFileValidator.ERROR_TYPE` - Indicates a file type error
`SimpleFileValidator.ERROR_MAX_SIZE` - Indicates a file size large error
`SimpleFileValidator.ERROR_MIN_SIZE` - Indicates a file size small error