<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Inputs</h1>
</div>

<br>

```tsx
const input = state('');

renderer.render(
  <>
    <input _state={input} type='text' placeholder='type something ...'/>
    <div>You typed: {input}</div>
  </>
).on(document.body);
```
<iframe deferred-src="https://callbag-jsx-demo-input.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-input

👉 This works with various input types, `<select>` elements and `<textarea>` elements.

👉 Use `_value` attribute on select options to attach object values to each option:

```tsx
const people = state([]);

const john = { name: 'John', age: 32 };
const jack = { name: 'Jack', age: 24 };
const jill = { name: 'Jill', age: 17 };

renderer.render(
  <>
    <select multiple _state={people}>
      <option _value={john}>{john.name}</option>
      <option _value={jack}>{jack.name}</option>
      <option _value={jill}>{jill.name}</option>
    </select>

    <br/>

    Age sum: {expr($ => $(people).reduce((t, p) => t + p.age, 0))}
  </>
).on(document.body);
```
<iframe deferred-src="https://callbag-jsx-demo-select.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-select

<br>

> 👉 Callbag-JSX is an extension of [Render-JSX](https://loreanvictor.github.io/render-jsx/),
> so it also supports features of [Render-JSX inputs](https://loreanvictor.github.io/render-jsx/docs/usage/dom/inputs-and-events#inputs).

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>