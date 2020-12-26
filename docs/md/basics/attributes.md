<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Attributes</h1>
</div>

<br>

```tsx
const x = <div title='Hellow World!'>Bring the mouse over this.</div>
```

<br>

👉 You can use JavaScript variables and expressions for JSX attributes:

```tsx
const msg = 'Hellow World!';
const x = <div title={msg}>Bring the mouse over this.</div>
```
```tsx
const name = 'World';
const x = <div title={'Hellow ' + name + '!'}>Bring the mouse over this.</div>
```

---

## Dynamic Attributes

If a given attribute is a [callbag](/reactivity/callbags), the element's attribute
will be updated when the callbag has new values.

```tsx
const timer = interval(1000);
const placeholder = expr(
  $ => `You have been here ${$(timer) + 1 || 0} seconds!`
);

renderer.render(
/*!*/  <input placeholder={placeholder} type='text'/>
).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-demo-timer2.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-timer2

<br>

> 👉 Dynamic attributes are updated only while the element lives on the DOM.

---

## Data, Aria and Custom Attributes

`callbag-jsx` creates attributes regardless of their naming. However, if you are using TypeScript,
attributes are type-checked. The type-checking overlooks any attribute in the form of `*-*`. So you
can set data or aria attributes without any errors:

```tsx
<div data-x="hellow" aria-label="Yo!"/>
```

If you want to have custom attributes, either use the same `*-*` convention, or add the attributes
using the spread operator and casting to `any`:

```tsx
const props = { x : 2 };
const D = <div title='wassup' {...props as any}/>;
```

---

## Styles and Classes

While `class` or `style` attributes are like other attributes, `callbag-jsx`
provides plugins that make managing element classes and styles much easier.

> 👉 Read more about [classes](/basics/classes) and [styles](/basics/styles).

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>