<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Events</h1>
</div>

<br>

```tsx
const count = state(0);

renderer.render(
/*!*/  <div onclick={() => count.set(count.get() + 1)}>
    You have clicked this {count} times!
  </div>
).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-demo-clicks.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-clicks

<br>

> 👉 The event object will be passed as the argument of given function.

<br>

👉 You can also pass [callbags](/reactivity/callbags) as event handlers, and the event
object will be sent as data to the callbag:

```tsx
const mouse = makeSubject();
const target = pipe(mouse, debounce(50));

renderer.render(
/*!*/  <div class='container' onmousemove={mouse}>
    <div class='ball' style={{
      transition: { 'transform.s': .5 },
      transform: expr($ => ({
        'translateX.px': $(target)?.clientX,
        'translateY.px': $(target)?.clientY,
      }))
    }}/>
  </div>
).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-demo-events.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-events

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>