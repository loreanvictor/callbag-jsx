<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Classes</h1>
</div>

<br>

```tsx
<div class='greeting red'>Hellow World!</div>
```
```tsx
<div class={['greeting', 'red']}>Hellow World!</div>
```

---

## Dynamic Classes

Provide [callbags](/reactivity/callbags) in the array to dynamically switch the class:
```tsx
const timer = interval(1000);
const _class = expr($ => $(timer) % 2 ? 'blue': 'red');

renderer.render(
/*!*/  <div class={['greeting', _class]}>Hellow World!</div>
).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-demo-classes-1.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-classes-1

---

## Class Maps

Provide class maps (mapping class names to booleans or callbags of booleans) to dynamically toggle classes:

```tsx
const timer = interval(1000);
const even = expr($ => $(timer) % 2);

renderer.render(
/*!*/  <div class={{ bold: even, greeting: true }}>Hellow World!</div>
).on(document.body);
```

👉 Or use combinations of arrays and class maps:

```tsx
const timer = interval(1000);
const even = expr($ => $(timer) % 2);

renderer.render(
/*!*/  <div class={['greeting', { bold: even }]}>Hellow World!</div>
).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-demo-classes-2.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-classes-2

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>