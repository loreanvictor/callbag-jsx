> :DarkLight
> > :InLight
> >
> > <div align="center"><img src="/docs/assets/callbag-jsx-banner.svg" width="300px"/></div>
>
> > :InDark
> >
> > <div align="center"><img src="/docs/assets/callbag-jsx-dark-banner.svg" width="300px"/></div>

`callbag-jsx` is a minimalist UI library using [JSX](/jsx) for layouts and [callbags](/reactivity/callbags)
for reactivity. No virtual DOM, no dirty model checking, no compile time invalidations,
or any other magic tricks.

```tsx
import { makeRenderer } from 'callbag-jsx';

const renderer = makeRenderer();
/*!*/renderer.render(<div>Hellow World!</div>).on(document.body);
```

---

👉 A more interactive example:

```tsx
const count = state(0);

const add = () => count.set(count.get() + 1);
const color = expr($ => $(count) % 2 ? 'red' : 'green');

renderer.render(
/*!*/  <div onclick={add} style={{ color }}>
/*!*/    You have clicked {count} times!
/*!*/  </div>
).on(document.body);
```

<iframe height="192" deferred-src="https://callbag-jsx-demo.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo

---

👉 The famous Todolist app:

```tsx
const todos = state([{title: 'Do this'}, {title: 'Do that'}]);
const next = state('');

const add = () => {
  todos.set(todos.get().concat([{title: next.get()}]));
  next.set('');
};

renderer.render(<>
/*!*/  <h1>Todos</h1>
/*!*/  <ol>
/*!*/    <List of={todos} each={todo => <li>{todo.sub('title')}</li>}/>
/*!*/  </ol>
/*!*/  <input type='text' _state={next} placeholder='What should be done?'/>
/*!*/  <button onclick={add}>Add</button>
</>).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-todolist.stackblitz.io" height="256"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-todolist

---

## Quick Links

- [Getting Started](/getting-started)
- [Why Callbag-JSX?](/meta/why)
- [Comparison with Other Frameworks](/meta/compare)

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>