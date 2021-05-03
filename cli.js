#!/usr/bin/env node
import meow from 'meow';
import getStdin from 'get-stdin';
import terminalImage from 'terminal-image';
import fileType from 'file-type';

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
		// TODO: Make it `if ((await fileType.fromFile(input))?.ext === 'gif') {` when targeting Node.js 14.
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
