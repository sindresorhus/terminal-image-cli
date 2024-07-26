import test from 'ava';
import {execa} from 'execa';
import hasAnsi from 'has-ansi';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['fixture.jpg']);
	t.true(hasAnsi(stdout));
});
