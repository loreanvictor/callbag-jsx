// tslint:disable: no-magic-numbers

const sub = require('callbag-behavior-subject').default;
import state from 'callbag-state';

import { makeRenderer, List } from '../src';

const renderer = makeRenderer();
const s = state([{i: 1, c: 'A'}, {i: 2, c: 'B'}]);

renderer.render(<List of={s} each={x => <span>{x.sub('c')}</span>}/>).on(document.body);

s.set([{i: 2, c: 'B'}, {i: 1, c: 'A'}]);
s.set([{i: 2, c: 'B'}, {i: 1, c: 'C'}]);
