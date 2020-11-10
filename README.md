# callbag-jsx
callbags + JSX - VDOM or any other behind the scenes implicit change detection / propagation mechanism.

```tsx
import { makeRenderer, List } from 'callbag-jsx';
import { state } from 'callbag-state';
import { expr } from 'callbag-expr';

const renderer = makeRenderer();

const todos = state([{title: 'Do this'}, {title: 'Do that'}]);
const next = state('');

const add = () => {
  todos.set(todos.get().concat([{title: next.get()}]));
  next.set('');
};

renderer.render(<div>
  <h1>Todos</h1>
  <ol>
    <List of={todos} each={todo => <li>{todo.sub('title')}</li>}/>
  </ol>
  <input type='text' _state={next} placeholder='What should be done?'/>
  <button onclick={add}>Add #{expr($ => $(todos).length + 1)}</button>
</div>).on(document.body);
```
[TRY IT!](https://stackblitz.com/edit/callbag-jsx-todolist)

<br><br>

## Design Goals

`callbag-jsx` aims to be a UI library that provides comparable convenience of React without taking away any control from the developer.
Changes propagate explicitly via callbags, and DOM elements are explicitly bound to those callbags. This means no VDOM, no passive
change detection, no compile-time tracking code insertion, etc.

This also means that `callbag-jsx` should only make some stuff easier and seamlessly get out of the way when it cannot help really. This means
seamless interop with pure DOM API usage (and by extension any other tool / lib).

<br><br>
