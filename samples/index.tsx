// tslint:disable: no-magic-numbers

import { makeRenderer, List } from '../src';
import { ref } from 'render-jsx/common';
import { state } from 'callbag-state';
import { expr } from 'callbag-expr';

const renderer = makeRenderer();

// const count = 1000;
// const list = state<number[]>([]);

// renderer.render(<>
//   <button onclick={() => {
//     const l = [];
//     const s = list.get().length;
//     for (let i = 0; i < count; i++) { l.push(i + s); }
//     list.set(list.get().concat(l));
//   }}>ADD</button>
//   <List of={list} each={n => <div>{n}</div>} key={i => i}/>
// </>).on(document.body);

const l = state(['A', 'B', 'C', 'D']);
renderer.render(<List of={l} each={x => <>{x}</>} key={x => x}/>).on(document.body);

l.set(['D', 'A', 'E', 'F', 'C', 'G', 'H']);
