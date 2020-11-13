<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Why Callbag-JSX?</h1>
</div>

<br>

## [tune](:Icon) Control

Unlike most other frameworks and libraries, `callbag-jsx` **DOES NOT** decide when or how some part of the DOM
should be updated. Instead, it makes it super convenient for _you_ to precisely specify that, giving you full
control over the DOM while offering the same convenience as tools like React.

```tsx
const input = state('');

renderer.render(<>
  <input _state={input} type='text' placeholder='Type something ...'/>
  <div>{ input } <small>(instant)</small></div>
  <div>{ pipe(input, debounce(500)) } <small>(.5s delay)</small></div>
</>).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-debounce.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-debounce

<br><br>

## [touch_app](:Icon) Simplicity

`callbag-jsx` is pretty simple under the hood: It just binds callbags to corresponding DOM nodes.
There is no virtual DOM, no dirty model checking, etc. You won't have bugs for
creating a state in an if-clause [(like this)](https://reactjs.org/docs/hooks-rules.html) or
forgetting to write `data = data` [(like this)](https://svelte.dev/tutorial/updating-arrays-and-objects), because
there are no such weird rules here.

<br>

```tsx
const x = <div>Hellow World!</div>;

renderer.render(x).on(document.body);
```

Here `x` *IS* the DOM element that appears on screen, not a proxy for it.

<br>

```tsx
function MyComp(...) { ... }

renderer.render(<MyComp/>).on(document.body);
```

Here `MyComp` is called only once, when the render function is called. Not whenever the framework
decides to run it.

<br><br>

## [device_hub](:Icon) State Management

With callbags modeling reactivity, you do not need external state management tools such as Redux. You can even
manage complex state-trees seamlessly as `callbag-jsx` is integrated with `callbag-state` by default.

```tsx
const data = state([0, 0, 0, 0]);

renderer.render(<>
  State: {expr($ => $(data).join(', '))}
  <ol>
    <List of={data} each={i =>
      <li onclick={() => i.set(i.get() + 1)}>
        clicked {i} times
      </li>
    }/>
  </ol>
</>).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-state-management.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-state-management

<br><br>

## [speed](:Icon) Performance

Due to its inherent simplicity, `callbag-jsx` is [pretty light-weight (~7kb runtime)](https://bundlephobia.com/result?p=callbag-jsx@latest) and your app becomes interactive pretty quickly. It is also much faster than most popular frameworks in updating the DOM.

[![Performance Benchmark](https://i.imgur.com/bXDhojU.png)](https://i.imgur.com/bXDhojU.png)

[![Bootup Benchmark](https://i.imgur.com/m7NErMe.png)](https://i.imgur.com/m7NErMe.png)

> Benchmarked using [JS framework benchmark](https://github.com/krausest/js-framework-benchmark).

<br><br>

## [developer_board](:Icon) Versatility

Again, due to its simplicity, `callbag-jsx` is highly inter-operable and robust. You can use it alongside other
frameworks and tools, in other environments (for example in the backend), etc. You can even manually modify
the DOM whenever you need to, for example if you need to optimize some particular section of your app for maximum performance.

<br><br>

> :ToCPrevNext