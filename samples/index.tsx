// tslint:disable: no-magic-numbers

const sub = require('callbag-behavior-subject').default;
import { Callbag } from 'callbag';
import expr from 'callbag-expr';

import { makeRenderer, For } from '../src';

const renderer = makeRenderer();
type Data = { id: number, label: string };
const l: Callbag<Data[], Data[]>= sub([{id: 1, label: 'hellow'}]);

renderer.render(<>
  <For of={l} key={x => x.id} each={(x) => <>
    <div>{expr($ => $(x)?.id)}</div>
    <div>{expr($ => $(x)?.label)}</div>
  </>}/>
</>).on(document.body);
