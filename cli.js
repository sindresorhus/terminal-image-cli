#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import getStdin from 'get-stdin';
import terminalImage from 'terminal-image';
import {fileTypeFromFile, fileTypeFromBuffer} from 'file-type';

const cli = meow(`
	Usage
	  $ image <image>
	  $ cat <image> | image

	Examples
	  $ image unicorn.jpg
	  $ cat unicorn.jpg | image
`, {
	importMeta: import.meta,
});

const [input] = cli.input;

if (!input && process.stdin.isTTY) {
	console.error('Specify the path to an image');
	process.exit(1);
}

if (input) {
	const {ext} = await fileTypeFromFile(input);

	if (ext === 'gif') {
		terminalImage.gifFile(input);
	} else {
		console.log(await terminalImage.file(input));
	}
} else {
	const stdin = await getStdin.buffer();
	const {ext} = await fileTypeFromBuffer(stdin);

	if (ext === 'gif') {
		terminalImage.gifBuffer(stdin);
	} else {
		console.log(await terminalImage.buffer(stdin));
	}
}
