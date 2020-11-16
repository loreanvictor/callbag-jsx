<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Styles</h1>
</div>

<br>

You can set styles as in HTML, or provide style objects:

```tsx
<div style='color: #f5b461; transform: rotate(15deg)'>Hellow World!</div>
```
```tsx
<div style={{
  color: '#f5b461',
  transform: {
    rotate: '15deg',
  }
}}>Hellow World!</div>
```

<br>

👉 You can put the unit in the css key:

```tsx
<div style={{
  color: '#f5b461',
  transform: {
/*!*/    'rotate.deg': 15,
  }
}}>Hellow World!</div>
```

> 👉 You can use nested objects for `transform` and `transition` css keys.

---

## Dyanmic Styles

You can provide [callbags](/reactivity/callbags) in the style object for dynamic styling:

```tsx
/*!*/const timer = interval(1000);
/*!*/const color = expr($ => $(timer) % 2 ? '#f5b461' : '#21aba5');

renderer.render(
  <div style={{
/*!*/    color: color,
    transition: {
      color: '.5s',
    },
    transform: {
      'rotate.deg': 15,
    }
  }}>Hellow World!</div>
).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-demo-styles.stackblitz.io" height="288"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-styles

---

## Dynamic Transform / Transition

If you want to pass nested objects for `transform`/`transition` with callbags as values,
use `expr()` to create a callbag returning the transform/transition object:

```tsx
const timer = interval(1000);

renderer.render(
  <div style={{
    color: '#f5b461',
    transition: 'transform .9s',
/*!*/    transform: expr($ => ({
/*!*/      'rotate.deg': $(timer) * 45
/*!*/    }))
  }}>Hellow World!</div>
).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-demo-styles1.stackblitz.io" height="288"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-styles1

<br><br>

> :ToCPrevNext