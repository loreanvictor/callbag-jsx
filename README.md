
<div align="center">
  <img src="callbag-jsx-banner.svg" width="320px"/>

[![tests](https://img.shields.io/github/workflow/status/loreanvictor/callbag-jsx/Test%20and%20Report%20Coverage?label=tests&logo=mocha&logoColor=green&style=flat-square)](https://github.com/loreanvictor/callbag-jsx/actions?query=workflow%3A%22Test+and+Report+Coverage%22)
[![coverage](https://img.shields.io/codecov/c/github/loreanvictor/callbag-jsx?logo=codecov&style=flat-square)](https://codecov.io/gh/loreanvictor/callbag-jsx)
[![version](https://img.shields.io/npm/v/callbag-jsx?logo=npm&style=flat-square)](https://www.npmjs.com/package/callbag-jsx)
[![docs](https://img.shields.io/badge/%20-docs-blue?logo=read%20the%20docs&logoColor=white&style=flat-square)](https://loreanvictor.github.io/callbag-jsx/)
</div>

---

Callbags + JSX. No virtual DOM, compile-time invalidation, or other _magic tricks_. \
👉 [Read the Docs](https://loreanvictor.github.io/callbag-jsx)

<br>

Sample Todolist app:

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

## Why?

👉 [Long Answer Here](https://loreanvictor.github.io/callbag-jsx/in-depth/why)

Main purpose of `callbag-jsx` is to provide full control over DOM while being as convenient as tools like React.
In other words, unlike other frameworks and tools, `callbag-jsx` **DOES NOT** infer when and how to update the DOM,
it gives you the tools to conveniently outline that.

As a result:
- It gives you full control and gets out of your way whenever it cannot help.
- It is faster than most popular frameworks (it does less)
- It is smaller than most popular frameworks (it needs less code)
- It is pretty straight-forward, i.e. it just bind given callbags to DOM elements. So no [weird hooks rules](https://reactjs.org/docs/hooks-rules.html).
- It is pretty robust, e.g. modify the DOM manually if you need to.

👉 [Comparison with Other Frameworks](https://loreanvictor.github.io/callbag-jsx/in-depth/compare)

<br><br>

## Installation

Easiest way is to use one of these templates:
- [TypeScript template](https://github.com/loreanvictor/callbag-jsx-starter-ts/generate)
- [JavaScript template](https://github.com/loreanvictor/callbag-jsx-starter-js/generate)

You can also just install the package:
```bash
npm i callbag-jsx
```
and use the following jsx pragmas in your `.jsx`/`.tsx` files:
```jsx
/** @jsx renderer.create */
/** @jsxFrag renderer.fragment */
```

👉 [Read the docs for more info/options](https://loreanvictor.github.io/callbag-jsx/install)

<br><br>

## Usage

```jsx
import { makeRenderer } from 'callbag-jsx';

const renderer = makeRenderer();
renderer.render(<div>Hellow World!</div>).on(document.body);
```
```jsx
import expr from 'callbag-expr';
import state from 'callbag-state';

const count = state(0);

const add = () => count.set(count.get() + 1);
const color = expr($ => $(count) % 2 ? 'red' : 'green');

renderer.render(
  <div onclick={add} style={{ color }}>
    You have clicked {count} times!
  </div>
).on(document.body);
```
👉 [Read the Docs](https://loreanvictor.github.io/callbag-jsx)

<br><br>

## Contribution

There are no contribution guidelines or issue templates currently, so just be nice (and also note that this is REALLY early stage). Useful commands for development / testing:

```bash
git clone https://github.com/loreanvictor/callbag-jsx.git
```
```bash
npm i                   # --> install dependencies
```
```bash
npm start               # --> run `samples/index.tsx` on `localhost:3000`
```
```bash
npm test                # --> run all tests
```
```bash
npm run cov:view        # --> run tests and display the code coverage report
```
```bash
npm i -g @codedoc/cli   # --> install CODEDOC cli (for working on docs)
```
```bash
codedoc install         # --> install CODEDOC dependencies (for working on docs)
```
```bash
codedoc serve           # --> serve docs on `localhost:3000/render-jsx` (from `docs/md/`)
```

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="200px"/>
</div>
