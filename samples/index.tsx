// tslint:disable: no-magic-numbers

// import { Callbag } from 'callbag';
// import pipe from 'callbag-pipe';
// import subscribe from 'callbag-subscribe';
// import expr from 'callbag-expr';
// import { state, SubState } from 'callbag-state';
// const subject = require('callbag-subject');

// import { List, makeRenderer } from '../src';

// const renderer = makeRenderer();

// type Todo = { title: string };

// const todos = state([
//   {title: 'Do this'},
//   {title: 'Do that'},
//   {title: 'Perhaps this as well'}
// ]);
// const next = state('');
// const click = subject();

// pipe(
//   expr(($, _) => {
//     if ($(click)) {
//       todos.sub(todos.get().length).set({title: _(next) as any});
//       next.set('');
//     }
//   }),
//   subscribe(() => {})
// );

// renderer.render(<>
//   <h1>Todos</h1>
//   <ol>
//     <List of={todos} each={(todo: SubState<Todo[], number>) => (
//       <li>
//         {todo.sub('title')}{Math.floor(Math.random()*10)}
//         <button onclick={() => todos.set(todos.get().filter(t => t !== todo.get()))}>X</button>
//       </li>
//     )} key={t => t.title}/>
//   </ol>
//   <input type='text' _state={next} placeholder='What needs to be done?'/>
//   <button onclick={click}>Add #{expr($ => $(todos as Callbag<never, Todo[]>)!!.length + 1)}</button>
// </>).on(document.body);

import state from 'callbag-state';

import { makeRenderer, List } from '../src';

const renderer = makeRenderer();

const list = [];
const count = 10000;
for (let i = 0; i < count; i++) {
  list.push(i);
}

const L = state(list);

renderer.render(
  <List of={L} each={(i: any) => <div style='height: 5vh'
      onclick={() => L.set(L.get().filter(_ => _ !== i.get()))}
    >item #{i} - click to remove</div>
  } key={(i: any) => i}/>
).on(document.body);

// import { state } from 'callbag-state';
// import { makeRenderer, List } from '../src';

// const renderer = makeRenderer();
// const s = state(['A', 'B', 'C']);
// const id = (x: any) => x;

// renderer.render(<List of={s} each={id} key={id}/>).on(document.body);

// s.set(['B', 'C', 'A']);
