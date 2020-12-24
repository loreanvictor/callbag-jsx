<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Callbags</h1>
</div>

<br>

[Callbags](https://github.com/callbag/callbag) represent _values that change over time_:

```tsx | --term ​
import { interval, pipe, map, filter, subscribe } from 'callbag-common'; // @see [callbag-common](https://loreanvictor.github.io/callbag-common/)

const source = interval(1000); // --> emits every second
pipe(
  source,
  map(x => x * 3),            // --> multiply by 3
  filter(x => x % 2),         // --> only allow odd numbers
  subscribe(console.log)      // --> log any incoming number
);
> 3
> 9
> 15
> 21
> 27
```

> :Buttons
> > :Button label=Playgound, url=https://stackblitz.com/edit/callbag-common

<br>

👉 If you are familiar with [RxJS](https://rxjs.dev/guide/overview), you can think of callbags as light-weight observables. \
👉 Checkout [this post](https://loreanvictor.github.io/callbag-common/what-are-callbags) for a more depth introduction to callbags.


> [local_library](:Icon) **CALLBAG LIBRARIES**
>
> There are [many](https://github.com/callbag/callbag/wiki) callbag libraries you can use with `callbag-jsx`. For examples
> in this documentation, we are going
> to use [callbag-common](https://loreanvictor.github.io/callbag-common), which includes a nice set of commonly used
> callbag utilities and is also installed on [the starter templates](/install#starter-templates).

<br>

---

<br>

## Creating Callbags

You can create callbag sources using [states](/reactivity/states),
using a [source factory](https://loreanvictor.github.io/callbag-common/#source-factories),
or [expressions](/reactivity/expressions) of other callbags:

```tsx
import { state } from 'callbag-state';
import { interval, fromEvent, expr } from 'callbag-common';


// a simple counter whose value we manually control:
const count = state(0);

// a timer emitting every second:
const timer = interval(1000);

// this will be the latest mouse event when mouse is moved:
const mouseEvent = fromEvent(document.body, 'mousemove');

// a computed value based on count and timer:
const computed = expr($ => $(count) * $(timer));

// a the X-axis of the mouse:
const mouseX = expr($ => $(mouseEvent).clientX);
```

👉 These callbags can now be embedded in DOM to make it change over time as well:

```tsx
renderer.render(
  <div style='height: 100vh'>
    count: {count}
    &emsp;
    <span onclick={() => count.set(count.get() - 1)}>⬇️</span>
    <span onclick={() => count.set(count.get() + 1)}>⬆️</span>
    <br/>

    timer: {timer} <br/>
    timer * count: {computed} <br/>
    mouseX: {mouseX} <br/>
  </div>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-cbsources.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-cbsources

<br>

---

<br>

## Transforming Callbags

You can pipe callbag sources to [callbag operators](https://loreanvictor.github.io/callbag-common/#operators)
to create new, modified callbags:

```tsx
import { state } from 'callbag-state';
import { pipe, map, debounce } from 'callbag-common';

const input = state('');
const len = pipe(
  input,
  debounce(200),       // --> wait 200 milliseconds after last input change
  map(s => s.length)   // --> map it to its length
);

renderer.render(
  <>
    <input _state={input} type='text' placeholder='Type something ...'/>
    <br/>
    Input Length: {len}
  </>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-cbops.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-cbops

<br>

> [local_bar](:Icon) **PIPELINE OPERATOR**
>
> If you are using the [JavaScript Starter Template](/install#starter-templates),
> or [Pipeline Operator Plugin for Babel](https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator),
> you can pipe callbags with the pipeline operator (`|>`) instead of the `pipe()` utility:
> ```tsx
> const len = input |> debounce(200) |> map(s => s.length)
> ```

<br>

---

<br>

## Subscribing to Callbags

Typically you need to subscribe to callbag sources (i.e. listen to them). In `callbag-jsx` this is done
implicitly when you embed callbags in DOM elements:

```tsx
const s = state(0);
renderer.render(<div>{s}</div>).on(document.body);
```

👉 The subscription only happens **AFTER** the element is appended to main document:

```tsx
const s = state(0);
const d = <div>{s}</div>;               // --> no subscription
renderer.render(d).on(document.body);   // --> subscription happens here
```

👉 The subscription is cleared when the element is removed from the main document:

```tsx
const s = state(0);
const d = <div>{s}</div>;               // --> no subscription
renderer.render(d).on(document.body);   // --> subscription happens here

renderer.render(
  <button onclick={() => renderer.remove(d)}>Remove</button> {/* --> subscription ends when this button is clicked */}
).on(document.body);
```

> ⚠️ **IMPORTANT** ⚠️
>
> You **MUST** use `renderer.remove()` method to ensure that the subscriptions of a DOM element are cleared. Otherwise,
> this might result in a memory leak as subscription resources are not released.

<br>

You can also explicitly subscribe to callbags, using [`subscribe()`](https://loreanvictor.github.io/callbag-common/util/subscribe)
utility:

```tsx
import { pipe, subscribe } from 'callbag-common';
import { state } from 'callbag-state';

const s = state(0);
pipe(s, subscribe(console.log));  // --> logs changes in value of s
```

👉 Remember to clear manual subscriptions when you no longer need them:

```tsx
import { pipe, subscribe } from 'callbag-common';
import { state } from 'callbag-state';

const s = state(0);
const clear = pipe(s, subscribe(console.log));

// when everything is done:
clear();
```

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>