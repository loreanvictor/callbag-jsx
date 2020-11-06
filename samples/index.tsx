// tslint:disable: no-magic-numbers

const sub = require('callbag-behavior-subject').default;
import { Callbag } from 'callbag';
import state from 'callbag-state';
import { makeRenderer, For, List } from '../src';

const renderer = makeRenderer();

// const l: Callbag<string[], string[]>= sub(['A', 'B', 'C', 'D']);
const l = state(['A', 'B', 'C', 'D']);
renderer.render(<List of={l} key={x => x} each={(x, i) => <div>{i} - {x}</div>}/>).on(document.body);

l(1, ['D', 'A', 'E', 'F', 'C', 'G', 'H']);
