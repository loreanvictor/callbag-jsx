<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Expressions</h1>
</div>

<br>

The `expr()` utility allows creating expressions from other callbags:

```tsx
/*!*/import { expr } from 'callbag-common';

const count = state(0);

const add = () => count.set(count.get() + 1);
/*!*/const color = expr($ => $(count) % 2 ? 'red' : 'green');

renderer.render(
  <div onclick={add} style={{ color }}>
    You have clicked {count} times!
  </div>
).on(document.body);
```

<iframe height="192" deferred-src="https://callbag-jsx-demo.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo

```tsx
import { expr } from 'callbag-common';

const a = state(0);
const b = state(0);

renderer.render(
  <>
    <input _state={a} type='number'/>
    +
    <input _state={b} type='number'/>
    =
    {expr($ => $(a) + $(b))}
  </>
).on(document.body);
```

<iframe height="192" deferred-src="https://callbag-jsx-demo-expr.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-expr

<br>

> ⚠️ **IMPORTANT** ⚠️
>
> Be careful to **NOT** create new callbags inside the function passed to `expr()`:
> ```ts
> // 🚫 WRONG:
> expr($ => /*~*/$(interval(1000))/*~*/ % 2)
>
> // ✅ CORRECT:
> const timer = interval(1000)
> expr($ => $(timer) % 2)
> ```

<br>

---

<br>

## Passive Tracking

The `expr()` is re-calculated any time any of the _tracked_ callbags has a new value. You can also
passively track callbags, so that their latest value is used without the expression being re-calculated
when they have new value:

```tsx
const a = state(0);
const b = state(0);

renderer.render(
  <>
    <input _state={a} type='number'/>
    +
    <input _state={b} type='number'/>
    =
    {expr(($, _) => $(a) + _(b))}  {/* --> b is tracked passively */}
  </>
).on(document.body);
```

<iframe height="192" deferred-src="https://callbag-jsx-demo-expr-2.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-expr-2

<br>

> ⚠️ **WARNING**
>
> Make sure that at least one callbag is actively tracked, as otherwise the expression
> will never be re-evaluated!

<br>

---

<br>

## Default Values

The expression might be evaluated while some callbags have not yet emitted values.
In that case, `undefined` is assumed for their value. You can change that by providing
a default value to the `$()` tracking function:

```ts
expr($ => $(a, 0) % 2)  // --> assume value 0 when a has not emitted yet
```

<br>

> [local_library](:Icon) **FURTHER READING**
>
> `expr()` is a utility provided by [callbag-common](https://loreanvictor.github.io/callbag-common/)
> package, exported from [callbag-expr](https://github.com/loreanvictor/callbag-expr).
> Checkout their corresponding docs ([here](https://loreanvictor.github.io/callbag-common/combine/expr)
> and [here](https://github.com/loreanvictor/callbag-expr#readme)) for further information.


<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>