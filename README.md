
<div align="center"><img src="callbag-jsx-banner.svg" width="320px"/></div>

Callbags + JSX. No virtual DOM, no passive change detection, no compile-time invalidation.

```bash
npm i callbag-jsx
```

👉 Sample Todolist app:

```tsx
import { makeRenderer, List } from 'callbag-jsx';
import { state } from 'callbag-state';

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
  <button onclick={add}>Add</button>
</div>).on(document.body);
```
[►TRY IT!](https://stackblitz.com/edit/callbag-jsx-todolist)

<br><br>

# Why?

🎛️ **Control**: `callbag-jsx` provides convenience of React without taking control away.

```tsx
import state from 'callbag-state';
import pipe from 'callbag-pipe';
import { debounce } from 'callbag-debounce';
import { makeRenderer } from 'callbag-jsx';

const renderer = makeRenderer();
const s = state('');

renderer.render(<div>
  <input _state={s} type='text' placeholder='Type something ...'/>
  <br/>
  { s }
  <br/>
  { pipe(s, debounce(200)) }
</div>).on(document.body);
```
[►TRY IT!](https://stackblitz.com/edit/callbag-jsx-debounce)

<br>

⚡ **Performance**: there is no virtual DOM, dirty model checking, etc. `callbag-jsx` just binds callbags to DOM elements. As a result:
- It is much faster than most popular frameworks.
- Its bundles are much smaller (so faster to ship).
- No bootstrapping besides your own code, so web-apps are quickly interactive.
![Performance Benchmark](https://i.imgur.com/bXDhojU.png)
![Bootup Benchmark](https://i.imgur.com/m7NErMe.png)
<sub>Benchmarks conducted using [JS framework benchmark](https://github.com/krausest/js-framework-benchmark).</sub>

<br>

🔮 **Predictability**: There are no _peculiar hooks rules_, _compile time invalidation rules_, etc. A component is just a function that is called exactly once to render some part of the UI. You just need to know JS(X) to fully understand what happens.

<br>

🛠️ **Versatility**: Because of its simplicity, `callbag-jsx` is highly interoperable and robust. You can even manually modify the DOM whenever you need to (for example for obtaining maximum possible performance).

