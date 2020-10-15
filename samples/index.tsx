// tslint:disable: no-magic-numbers

import pipe from 'callbag-pipe';
import map from 'callbag-map';

import { makeRenderer, makeState } from '../src';

const renderer = makeRenderer();
const count = makeState(0);
const style = pipe(
  count,
  map((x: number) => x % 2 === 0 ? 'color: red': 'color: blue')
);

renderer.render(
  <div onclick={() => count.set(count.get() + 1)} style={style}>
    You have clicked {count} times!
  </div>
).on(document.body);
