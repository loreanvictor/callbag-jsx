// tslint:disable: no-magic-numbers

import subject from 'callbag-subject';
import { List, makeRenderer } from '../src';

const renderer = makeRenderer();

const s = subject<{x: number, y: string}[]>();

renderer.render(<List of={s} each={i => <div>{i.sub('y')}</div>} key={i => i.x}/>).on(document.body);

s(1, [{x: 1, y: 'A'}, {x: 2, y: 'B'}]);

setTimeout(() => s(1, [{x: 1, y: 'C'}, {x: 3, y: 'D'}]), 3000);
