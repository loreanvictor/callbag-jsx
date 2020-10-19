// tslint:disable: no-magic-numbers

import pipe from 'callbag-pipe';
import subscribe from 'callbag-subscribe';
import expr from 'callbag-expr';
import state from 'callbag-state';

import { List, makeRenderer } from '../src';

const renderer = makeRenderer();

const initial = [
  {title: 'Do this'},
  {title: 'Do that'},
  {title: 'Perhaps this as well'}
];

const todos = state<{ title: string; }[]>(initial);
const next = state('');

renderer.render(<>
  <h1>Todos</h1>
  <ol>
    <List of={todos} each={todo => (
      <li>
        {todo.sub('title')}
        <button onclick={() => todos.set(todos.get()!!.filter(t => t !== todo.get()))}>X</button>
      </li>
    )}/>
  </ol>
  <input type='text' _state={next} placeholder='What needs to be done?'/>
  <button onclick={() => {
    todos.set([...todos.get()!!, {title: next.get()!!}]);
    next.set('');
  }}>Add #{expr($ => $(todos, []).length + 1)}</button>
</>).on(document.body);

