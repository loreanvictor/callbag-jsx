// tslint:disable: no-magic-numbers

import { Callbag } from 'callbag';
import pipe from 'callbag-pipe';
import subscribe from 'callbag-subscribe';
import expr from 'callbag-expr';
import { state, SubState } from 'callbag-state';
const subject = require('callbag-subject');

import { List, makeRenderer } from '../src';

const renderer = makeRenderer();

type Todo = { title: string };

const todos = state([
  {title: 'Do this'},
  {title: 'Do that'},
  {title: 'Perhaps this as well'}
]);
const next = state('');
const click = subject();

pipe(
  expr(($, _) => {
    if ($(click)) {
      todos.sub(todos.get().length).set({title: _(next) as any});
      next.set('');
    }
  }),
  subscribe(() => {})
);

renderer.render(<>
  <h1>Todos</h1>
  <ol>
    <List of={todos} each={(todo: SubState<Todo[], number>) => (
      <li>
        {todo.sub('title')}
        <button onclick={() => todos.set(todos.get().filter(t => t !== todo.get()))}>X</button>
      </li>
    )}/>
  </ol>
  <input type='text' _state={next} placeholder='What needs to be done?'/>
  <button onclick={click}>Add #{expr($ => $(todos as Callbag<never, Todo[]>)!!.length + 1)}</button>
</>).on(document.body);

