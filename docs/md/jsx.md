<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>JSX</h1>
</div>

<br>

JSX is an extension of JavaScript that allows interleaving XML-style code and JavaScript code.
It makes describing layout based on JavaScript logic and data pretty convenient.

<br>

---

<br>

## Transpilation

Browsers cannot understand JSX, you need a tool to transform it into JavaScript. Tools like
[TypeScript](https://www.typescriptlang.org/) or [Babel](https://babeljs.io/) can handle that
transformation, with corresponding config telling them how they should transpile JSX code.

<br>

With [proper configuration](/install#manual-installation), this JSX code:
```tsx
const name = 'Jack';
const title = 'Greetings!';

<div class='hellow' title={title}>Hi {name}!</div>
```
is transpiled to this JavaScript code:
```js
const name = 'Jack';
const title = 'Greetings!';

renderer.create('div', { class: 'hellow', title: title }, 'Hi', name, '!');
```
<br>

Or this JSX code:
```tsx
<MyComponent prop={something}/>
```
is transpile to this:
```js
renderer.create(MyComponent, { prop: something });
```

<br>

---

<br>

## Renderer Object

Because JSX is transpiled to `renderer.create()` expressions, you **MUST** have an object named
`renderer`, which is an actual renderer (or at least has a `.create()` method), defined in the scope.

🚫 **WRONG**:
```tsx
const div = /*~*/<div>Hellow</div>/*~*/;            // --> ERROR: renderer is not defined

const renderer = makeRenderer();
renderer.render(div).on(document.body);
```

👌 **CORRECT**:

```tsx
const renderer = makeRenderer();

const div = <div>Hellow</div>;                  // --> renderer is now defined
renderer.render(div).on(document.body);
```

<br>

🚫 **WRONG**:
```tsx
function MyComponent(props) {
  reutrn /*~*/<div>Hellow</div>/*~*/;             // --> ERROR: renderer is not defined
}
```

👌 **CORRECT**:
```tsx
function MyComponent(props, renderer) {
  reutrn <div>Hellow</div>;                    // --> renderer is now defined
}
```

<br>

---

<br>

## Use without JSX

Since JSX is just a syntactic sugar, you can use `callbag-jsx` without actually using JSX:

> :Tabs
> > :Tab title=JSX
> > ```tsx
> > <div class="hellow" tabindex={2}>Hellow</div>
> > ```
>
> > :Tab title=JavaScript
> > ```js
> > renderer.create('div', {class: 'hellow', tabindex: 2}, 'Hellow');
> > ```

<br>

> :Tabs
> > :Tab title=JSX
> > ```tsx
> > <Component prop={value}>Some {stuff}</Component>
> > ```
>
> > :Tab title=JavaScript
> > ```js
> >  renderer.create(Component, {prop: value}, 'Some', stuff);
> > ```

<br>

> :Tabs
> > :Tab title=JSX
> > ```tsx
> > const renderer = makeRenderer();
> > 
> > const s = state(0);
> > 
> > renderer.render(
> >   <div>You were here for {s} seconds!</div>
> > ).on(document.body);
> > 
> > setInterval(() => s.set(s.get() + 1), 1000);
> > ```
>
> > :Tab title=JavaScript
> > ```js
> > const renderer = makeRenderer();
> > 
> > const s = state(0);
> > 
> > renderer.render(
> >   renderer.create('div', {}, 'You were here for ', s, ' seconds!')
> > ).on(document.body);
> > 
> > setInterval(() => s.set(s.get() + 1), 1000);
> > ```

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>