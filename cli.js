#!/usr/bin/env node
'use strict';
const meow = require('meow');
const getStdin = require('get-stdin');
const terminalImage = require('terminal-image');

const cli = meow(`
	Usage
	  $ image <image>
	  $ cat <image> | image

	Examples
	  $ image unicorn.jpg
	  $ cat unicorn.jpg | image
`);

const [input] = cli.input;

if (!input && process.stdin.isTTY) {
	console.error('Specify the path to an image');
	process.exit(1);
}

(async () => {
	if (input) {
		console.log(await terminalImage.file(input));
	} else {
		console.log(await terminalImage.buffer(await getStdin.buffer()));
	}
})();
