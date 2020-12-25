<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>References</h1>
</div>

<br>

You can reference DOM elements simply by storing them in variables:

```tsx
const x = <div>Hellow World!</div>;
```

However, that can reduce readability as it can lead to overmixing of JS and JSX:

```tsx
function MyComponent(_, renderer) {
  const x = <div>Hellow World!</div>
  const remove = () => renderer.remove(x);

  return <div>
    {x}
    <br/> Also other stuff
    <button onclick={remove}>Hola</button>
  </div>;
}
```

<br>

You can use `ref()` to avoid that and keep layout and logic as separated as possible:

```tsx
/*!*/import { ref } from 'render-jsx/common';

function MyComponent(_, renderer) {
/*!*/  const x = ref();
  const remove = () => renderer.remove(x.$);

  return <div>
/*!*/    <div _ref={x}>Hellow World!</div>
    <br/> Also other stuff
    <button onclick={remove}>Hola</button>
  </div>;
}
```

> :Buttons
> > :Button label=Learn More, url=https://loreanvictor.github.io/render-jsx/docs/usage/dom/ref

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>