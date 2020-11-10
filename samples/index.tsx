// tslint:disable: no-magic-numbers

const sub = require('callbag-behavior-subject').default;
import { Callbag } from 'callbag';
import state from 'callbag-state';
import expr from 'callbag-expr';

import { makeRenderer, For } from '../src';

const renderer = makeRenderer();
const s = state([{i: 1, c: 'A'}, {i: 2, c: 'B'}]);
// const s: Callbag<{i: number, c: string}[], {i: number, c: string}[]> = sub([{i: 1, c: 'A'}, {i: 2, c: 'B'}]);

renderer.render(<For of={s} each={x => <span>{expr($ => $(x)?.c)}</span>} key={x => x.i}/>).on(document.body);

s(1, [{i: 2, c: 'B'}, {i: 1, c: 'A'}]);
s(1, [{i: 2, c: 'B'}, {i: 1, c: 'C'}]);
