# Simple-file-validator

A simple file validator for input file on web pages, No plugin or addons required.

## Usage

	setFileRulesOn("#dp" /* any valid selector */, {
		accept: "image/*", // file mime type
		minSize: 10000, // minimum file size in bytes is 10000 bytes
		maxSize: "50k", // maximum file size is 50KB
		onInvalid: imageInvalid // function to be called when file error occurs
	});

	setFileRulesOn("#cover", {
		accept: ".jpg, .jpeg", // file extension names
		onInvalid: imageInvalid
	});

	setFileRulesOn("#intro", {
		accept: ".webm, video/mp4", // combination of file extension names and file mime types
		minSize: "20m", // 20 MB minimum size
		maxSize: "50m", // 50 MB maximum size
		onInvalid: videoInvalid
	});

	setFileRulesOn("#theme", { 
		accept: "audio/mp3, .wav, .m4a", 
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
