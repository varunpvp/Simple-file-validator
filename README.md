# Simple-file-validator

A simple input file validator for web pages

## Usage

	setFileTypesOn("#dp" /* any valid selector */, {
		accept: "image/*", // file types to be allowed
		minSize: "10k", // min size of file
		maxSize: "50k", // max size of file
		onInvalid: imageInvalid // function to be called with (input, file, errorCode)
	});

	setFileTypesOn(".cover", {
		accept: ".jpg, .jpeg", 
		onInvalid: imageInvalid
	});

	setFileTypesOn("#intro", {
		accept: ".webm,video/mp4",
		maxSize: "20m",
		onInvalid: videoInvalid 
	});

	setFileTypesOn("#theme", { 
		accept: "audio/mp3, .wav", 
		maxSize: "6m",
		onInvalid: audioInvalid
	});

## Params

`selector` - valid input file type selector, it can be any CSS selector

`rules` - set of rules which will be applied to input file

## Methods

`setFileTypesOn` - apply set of rules to files by using selector