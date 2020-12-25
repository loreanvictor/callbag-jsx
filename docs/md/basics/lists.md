<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Lists</h1>
</div>

<br>

The `<List/>` component allows rendering dynamic lists:

```tsx
import { List } from 'callbag-jsx';

const records = state([]);
const add = () => records.set(records.get().concat(new Date()));
const clear = () => records.set([]);

renderer.render(
  <>
    <button onclick={add}>Add</button>
    <button onclick={clear}>Clear</button>
    <ul>
      <List of={records} each={record => <li>{record}</li>}/>
    </ul>
  </>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-list.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-list

<br>

👉 `<List/>` provides a state object (a sub-state) to the `each()` parameter, representing
the value of a specific index of given list.
You can track/render properties of each value using `.sub()` method:

```tsx
const todos = state([{title: 'Do this'}, {title: 'Do that'}]);
const next = state('');

const add = () => {
  todos.set(todos.get().concat([{title: next.get()}]));
  next.set('');
};

renderer.render(
  <>
    <h1>Todos</h1>
    <ol>
      <List of={todos} each={todo => <li>{todo.sub('title')}</li>}/>
    </ol>
    <input type='text' _state={next} placeholder='What should be done?'/>
    <button onclick={add}>Add</button>
  </>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-todolist.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-todolist

<br>

👉 You can also use `.get()` method on the state passed to `each()` parameter
to get a snapshot value. This can be useful for example for handling clicks on items of the list:

```tsx
const records = state([]);
const add = () => records.set(records.get().concat(new Date()));
const clear = () => records.set([]);
/*!*/const remove = date => records.set(records.get().filter(d => d !== date));

renderer.render(
  <>
    <button onclick={add}>Add</button>
    <button onclick={clear}>Clear</button>

    <br/>

    <small>
      Click on each record to remove it.
    </small>
    <ul>
      <List of={records} each={record =>
/*!*/        <li onclick={() => remove(record.get())}>
/*!*/          {record}
/*!*/        </li>}/>
    </ul>
  </>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-list-2.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-list-2

<br>

---

<br>

## Indexes

The index of the element being rendered is also passed to `each()` parameter
as a second argument:

```tsx
const records = state([]);
const add = () => records.set(records.get().concat(new Date()));
const clear = () => records.set([]);
const remove = (date) => records.set(records.get().filter(d => d !== date));

renderer.render(
  <>
    <button onclick={add}>Add</button>
    <button onclick={clear}>Clear</button>

    <br/>

    <small>
      Click on each record to remove it.
    </small>

/*!*/    <List of={records} each={(record, index) =>
/*!*/      <div onclick={() => remove(record.get())} class={{odd: index % 2}}>
/*!*/        {index + 1} - {record}
/*!*/      </div>}
/*!*/    />
  </>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-list-3.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-list-3

<br>

---

<br>

## Keyed Lists

By default, DOM elements (returned by `each()` parameter) are mapped to a specific index
(the index that is also passed to `each()` as second parameter). This can lead to unnecessary
DOM updates: for example removing the first element of the list causes a change in values of all indexes
of the list, so all DOM elements will be updated.

To make DOM updates smarter, DOM elements need to be connected to list elements via some other indentifier.
This identifier can be passed to `<List/>` component as `key` property:

```tsx
const tasks = state([]);
const next = state('');
let id = 0;

const add = () => {
  const newTask = {
    id: id,
    title: next.get()
  };

  id += 1;
  next.set('');
  tasks.set(tasks.get().concat(newTask));
}

renderer.render(
  <>
    <input type='text' _state={next}/>
    <button onclick={add}>Add</button>

    <br/>

    <List of={tasks}
      each={task => <div>{task.sub('title')} ({task.sub('id')})</div>}
/*!*/      key={task => task.id}
    />
  </>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-keyed-list.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-keyed-list

<br>

> [info](:Icon (align=-6px)) **IMPORTANT**
>
> The key function passed to `<List/>` **MUST** return _stable_ and _unique_ strings or numbers:
>
> - _stable_ means it should return the same value for the same object (so no random stuff).
> - _unique_ means it should not return the same value for different objects.

<br>

👉 When key function is provided, `each()` property will be invoked for each unique key (instead of index).
Since the list index corresponding to each item (unique key) can change over time, the `index` parameter
provided to `each()` will also be a callbag instead of a static value:

```tsx
const tasks = state([]);
const next = state('');
let id = 0;

const add = () => {
  const newTask = {
    id: id,
    title: next.get()
  };

  id += 1;
  next.set('');
  tasks.set(tasks.get().concat(newTask));
}

const remove = task => {
  tasks.set(tasks.get().filter(t => t.id !== task.id));
}

renderer.render(<>
  <input type='text' _state={next}/>
  <button onclick={add}>Add</button>

  <br/>
  <small>Click on each item to remove it</small>

  <List of={tasks}
    each={(task, index) =>
/*!*/      <div class={{odd: expr($ => $(index) % 2)}}
           onclick={() => remove(task.get())}>
/*!*/        {expr($ => $(index) + 1)} - {task.sub('title')} ({task.sub('id')})
      </div>
    }
    key={task => task.id}
  />
</>).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-keyed-list-2.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-keyed-list-2

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>