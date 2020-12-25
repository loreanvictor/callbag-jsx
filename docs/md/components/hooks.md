<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Hooks</h1>
</div>

<br>

A [component](/components/overview) has three life-cycle events:

- **CREATE**: this is when the component function is called and it creates its corresponding DOM elements.
- **BIND**: this is when created DOM elements are added to the main document (and appear on screen).
- **CLEAR**: this is when created DOM elemenets are removed from the main document (and the screen).

<br>

These events are not unique to components:

```tsx
const timer = interval(1000);

const element = <div>You've been here for {timer} seconds!</div>;    // --> CREATE

renderer.render(element).on(document.body);                          // --> BIND
renderer.remove(element);                                            // --> CLEAR
```
☝️ Here, the callbag `timer` is embedded into `element` during **CREATE**. It is subscribed to
during **BIND**, so that content of `element` can be updated accordingly. This subscription is cleared
on **CLEAR**.

<br>

With component hooks, you can tap into these hooks in your component functions as well:

```tsx
export function MyComponent(_, renderer) {
  this.onBind(() => alert('Binding element ...'));
  this.onClear(() => alert('Clearing element ...'));

  return <h1>Hellow World!</h1>;
}
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-components-hooks.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components-hooks

<br>

---

<br>

## Type Safety

It is recommended to type-annotate the `this` argument in TypeScript for further type-safety. For utilizing
hooks, you can use `LiveComponentThis` interface for that purpose:

```tsx
import { LiveComponentThis } from 'render-jsx/component/plugins';

export function MyComponent(
  this: LiveComponentThis,
  ...
) {
  ...
}
```

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>