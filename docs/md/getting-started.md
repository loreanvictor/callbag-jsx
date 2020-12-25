<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Getting Started</h1>
</div>

<br>

## Setup a project

The easiest way for setting up a new `callbag-jsx` project is to use one of the following
starter templates on GitHub. Open the repo of your choice, and follow the instructions on the README.

> :Buttons
> > :Button label=TypeScript Template, url=https://github.com/loreanvictor/callbag-jsx-starter-ts#readme
>
> > :Button label=JavaScript Template, url=https://github.com/loreanvictor/callbag-jsx-starter-js#readme

<br>

👉 Read [the installation guide](/install) for other methods of installing `callbag-jsx`.

---

<br>

## Hellow World!

A simple _Hellow World!_ app looks like this:

```tsx
import { makeRenderer } from 'callbag-jsx';

const renderer = makeRenderer();
renderer.render(<div>Hellow World!</div>).on(document.body);
```

👉 Here is what happens:
1. We create a renderer object to render the UI.
1. We tell the renderer to render a `<div/>` element on `document.body`.

<br>

> [info](:Icon (align=-6px)) **ALWAYS** name your renderer object `renderer`.

<br>

---

<br>

## JSX

In the _Hellow World!_ exmaple above, we created a `<div/>` element inside JavaScript.
This is because we are using an extension of JavaScript called JSX, which allows us to
have JavaScript variables, expressions, etc inside our layout code seamlessly:

```tsx
const name = 'Jack';

renderer.render(
/*!*/  <div>Hellow {name}!</div>
).on(document.body);
```

👉 JSX expressions create HTML elements, so you can for example store them in variables:

```tsx
/*!*/const x = <div>Hellow {name}!</div>;
renderer.render(x).on(document.body);
```

> :Buttons
> > :Button label=Learn More, url=/jsx

<br>

> [info](:Icon (align=-6px)) You **MUST** have a renderer named `renderer` in any scope with JSX.

<br>

---

<br>

## Dynamic Content

[Callbags](/reactivity/callbags) are models for _stuff that change_.
When you embed them within your JSX, 
the resulting DOM will also change when the embeded callbags change:

```tsx
import state from 'callbag-state';

const count = state(0);
renderer.render(
/*!*/  <div>You have been here {count} seconds!</div>
).on(document.body);

setInterval(() => count.set(count.get() + 1), 1000);
```
<iframe deferred-src="https://callbag-jsx-demo-timer.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-timer
>
> > :Button label=Learn More, url=/basics/content

<br>

👉 You can similarly bind attributes of DOM elements to callbags:

```tsx
<div title={count}>Hover to see how many seconds you've been here.</div>
```

> :Buttons
> > :Button label=Learn More, url=/basics/attributes

<br>

---

<br>

## DOM Events

You can capture DOM events by providing an event listener function:

```tsx
const count = state(0);

renderer.render(
/*!*/  <div onclick={() => count.set(count.get() + 1)}>
/*!*/    You have clicked this {count} times!
/*!*/  </div>
).on(document.body);
```
<iframe deferred-src="https://callbag-jsx-demo-clicks.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-clicks?file=index.tsx
>
> > :Button label=Learn More, url=/basics/events

<br>

---

<br>

## User Input

You can fetch user input using `_state` attribute:

```tsx
const input = state('');

renderer.render(<>
/*!*/  <input _state={input} type='text' placeholder='type something ...'/>
/*!*/  <div>You typed: {input}</div>
</>).on(document.body);
```
<iframe deferred-src="https://callbag-jsx-demo-input.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-input?file=index.tsx
>
> > :Button label=Learn More, url=/basics/inputs

<br>

---

<br>

## Dynamic Expressions

You can use [`expr`](https://github.com/loreanvictor/callbag-expr) 
to easily create callbags based on expressions from other callbags:

```tsx
import { expr } from 'callbag-common';

const input = state('');
const length = expr($ => $(input).length);

renderer.render(<>
/*!*/  <input _state={input} type='text' placeholder='type something ...'/>
/*!*/  <div>You typed {length} characters.</div>
</>).on(document.body);
```
<iframe deferred-src="https://callbag-jsx-demo-input1.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-input1?file=index.tsx
>
> > :Button label=Learn More, url=/reactivity/expressions

<br>

---

<br>

## Dynamic Styles & Classes

Alongside dynamic content and attribute, you can specifically set dynamic styles
for your element by providing a _style map_ with some of its values being callbags:

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
>
> > :Button label=Learn More, url=/basics/styles

<br>

👉 Similarly, you can use callbags to dynamically change classes of a particular element.

```tsx
<div class={{ odd: expr($ => $(i) % 2 === 0) }}/>
```

> :Buttons
> > :Button label=Learn More, url=/basics/classes

<br>

---

<br>

## Conditional DOM

`<Conditional/>` component enables creating elements that appear conditionally:

```tsx
import { Conditional } from 'callbag-jsx';

const show = state(true);

renderer.render(<>
  <input type='checkbox' _state={show}/> Show stuff
/*!*/  <Conditional if={show}
/*!*/    then={() => <div>🦄🪕Stuff Are Shown ... 🪕🦄</div>}
/*!*/    else={() => <div>Not showing stuff</div>}
/*!*/  />
</>).on(document.body);
```

<iframe height="192" deferred-src="https://callbag-jsx-demo-conditional.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-conditional
>
> > :Button label=Learn More, url=/basics/conditionals

<br>

---

<br>

## Dynamic Lists (Loops)

You can use `<List/>` component to create dynamic lists:

```tsx
import { List } from 'callbag-jsx';

const records = state([]);
const add = () => records.set(records.get().concat(new Date()));
const clear = () => records.set([]);

renderer.render(<>
/*!*/  <button onclick={add}>Add</button>
/*!*/  <button onclick={clear}>Clear</button>
/*!*/  <ul>
/*!*/    <List of={records} each={record => <li>{record}</li>}/>
/*!*/  </ul>
</>).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-list.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-list
>
> > :Button label=Learn More, url=/basics/lists

<br>

---

## Data Fetching

You can use `<Wait/>` component for rendering based on data that is fetched asynchronously. 

```tsx
import { Wait } from 'callbag-jsx';

renderer.render(
  <Wait
    for={fetch('https://pokeapi.co/api/v2/pokemon/charizard').then(res => res.json())}
    with={() => <>Loading ...</>}
    then={pokemon => <h1>{pokemon.name}</h1>}
  />
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-wait.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-wait
>
> > :Button label=Learn More, url=/basics/wait

---

<br>

## Components

In `callbag-jsx`, components are functions that are used to create similar parts of the UI:

```tsx
const records = state([]);
const add = () => records.set(records.get().concat(new Date()));
const clear = () => records.set([]);

/*!*/function Record({ record }, renderer) {
/*!*/  const remove = () => records.set(records.get().filter(r => r !== record.get()));
/*!*/
/*!*/  return <div>{ record } <button onclick={remove}>X</button></div>
/*!*/}

renderer.render(
  <>
    <button onclick={add}>Add</button>
    <button onclick={clear}>Clear</button>
    <List of={records} each={record => <Record record={record}/>}/>
  </>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-components.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components
>
> > :Button label=Learn More, url=/components/overview

<br>

> [info](:Icon (align=-6px)) Components **MUST** have a second argument called `renderer`.

<br><br>

## Quick Links

- [JSX](/jsx)
- [Callbags](/reactivity/callbags)
- [Components Overview](/components/overview)
- [The DOM Renderer](/basics/renderer)

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>