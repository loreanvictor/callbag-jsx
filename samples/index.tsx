// tslint:disable: no-magic-numbers

import state from 'callbag-state';
import expr from 'callbag-expr';

import { makeRenderer, List } from '../src';

const renderer = makeRenderer();
const s = state([0, 0, 0, 0, 0]);


renderer.render(<>
  <List of={s} each={i =>
    <div onclick={() => i.set(i.get()!! + 1)}>clicked times</div>
  }/>
  {expr($ => $(s, []).join(','))}
</>).on(document.body);

