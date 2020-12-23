// tslint:disable: no-magic-numbers

import state from 'callbag-state';
import { List, makeRenderer } from '../src';

const renderer = makeRenderer();

const s = state<{x: number, y: string}[]>([
  {x: 12, y: 'A'},
  {x: 54, y: 'B'},
  {x: 7,  y: 'C'},
  {x: 43, y: 'D'},
]);

renderer.render(
  <List of={s} each={(i, j) =>
    <div onclick={() => s.set(s.get().filter(d => d.x !== i.get()!.x))}>
      {j} - {j} - {i.sub('y')}
    </div>
  } key={i => i.x}
  />
).on(document.body);

