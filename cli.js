#!/usr/bin/env node
'use strict';
const meow = require('meow');
const getStdin = require('get-stdin');
const terminalImage = require('terminal-image');
const fileType = require('file-type');

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
		if ((await fileType.fromFile(input)).ext === 'gif') {
			terminalImage.gifFile(input);
		} else {
			console.log(await terminalImage.file(input));
		}
	} else {
		const stdin = await getStdin.buffer();

		if ((await fileType.fromBuffer(stdin)).ext === 'gif') {
			terminalImage.gifBuffer(stdin);
		} else {
			console.log(await terminalImage.buffer(stdin));
		}
	}
})();
