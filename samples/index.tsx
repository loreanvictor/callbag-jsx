// tslint:disable: no-magic-numbers

import { makeRenderer, List } from '../src';
import { state } from 'callbag-state';
import { expr } from 'callbag-expr';

const renderer = makeRenderer();

const todos = state([{title: 'Do this'}, {title: 'Do that'}]);
const next = state('');

const add = () => {
  todos.set(todos.get().concat([{title: next.get()}]));
  next.set('');
};

renderer.render(<>
  <h1>Todos</h1>
  <ol>
    <List of={todos} each={todo => <li>{expr($ => $(todo)!!.title)}</li>}/>
  </ol>
  <input type='text' _state={next} placeholder='What should be done?'/>
  <button onclick={add}>Add #{expr($ => $(todos)!!.length + 1)}</button>
</>).on(document.body);
