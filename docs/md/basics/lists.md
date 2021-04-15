<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Lists</h1>
</div>

<br>

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

👉 `each()` function will be provided with a [state](/reactivity/states) object, reflecting
the value of a particular index. \
👉 Use `.sub()` method to read/track its properties:

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
>
> > :Button label=Learn More, url=/reactivity/states#substates

<br>

👉 Use `.get()` method to get a snapshot value.
This can be useful for handling events on items of the list:

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

The index of each element is passed to `each()`
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

By default, DOM elements (returned by `each()`) are bound to a specific index.
This means, for example, if you prepend an item to your array, contents of all DOM elements will
be updated (since the _content_ of all indices of the array have changed):

<div align="center">
<img src="/docs/assets/keyed-list-explained-1.png"/>
</div>

In some cases, this ☝️ is not the desired behavior. For example:

- When you recurringly prepend items to your list (or insert in the middle), this can be inefficient.
- When you want to manually modify the DOM, this can lead to mistakenly modifying the wrong elements.

You change this behavior by providing a _mapping_ between items of your list and DOM elements, in form of a _key function_:

```tsx
// map each element to a property
//
const key = x => x.id

// or, when list items are unique strings,
// use them directly as keys
//
const key = x => x
```

<div align="center">
<img src="/docs/assets/keyed-list-explained-2.png"/>
</div>

👉 Pass a _key function_ to `key` property of `<List/>` for smarter DOM updates:

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
> The key function passed to **MUST** return _stable_ and _unique_ strings (or numbers):
>
> - _stable_ means it should return the same value for the same object (so no random stuff).
> - _unique_ means it should not return the same value for different objects.

<br>

👉 When `key` is provided, `each()` will be invoked for each unique key (instead of index).
As the index of that key can change, `index` parameter
passed to `each()` will become a [callbag](/reactivity/callbags) (instead of a fixed number):

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
