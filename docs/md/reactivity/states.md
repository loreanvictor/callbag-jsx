<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>States</h1>
</div>

<br>

States are [callbags](/reactivity/callbags) that can store/track changing data:

```tsx | --term ​
import { state } from 'callbag-state';
import { pipe, subscribe } from 'callbag-common';

const s = state(42);
pipe(s, subscribe(console.log));

s.set(43);
s.set(s.get() + 1);
> 42
> 43
> 44
```

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-state?file=index.tsx

```tsx
const count = state(0);

renderer.render(
  <div>
    { count }
    &emsp;
    <span onclick={() => count.set(count.get() - 1)}>⬇️</span>
    <span onclick={() => count.set(count.get() + 1)}>⬆️</span>
  </div>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-state-2.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-state-2

👉 You can use `.get()` method on any state to get its current value:
```tsx
console.log(s.get());
```

> ⚠️ **IMPORTANT** ⚠️
>
> Don't change state objects without changing references:
> ```ts
> const s = state([1, 2, 3, 4]);
>
> // 🚫 WRONG:
> /*~warn~*/s.get().push(5);/*~warn~*/              // --> no updates
>
> // ✅ CORRECT:
> s.set(s.get().concat([5]));
>
> // ✅ CORRECT:
> s.set([...s.get(), 5]);
>
> // ✅😎 CORRECT & COOL:
> s.sub(s.get().length).set(5); // @see [Substates](#substates)
> ```

<br>

---

<br>

## Substates

When you store objects or arrays inside a state, you can get state objects corresponding
to specific properties/indexes using the `.sub()` method:

```tsx
const dude = state({
  name: 'John',
  age: 32,
  interests: [
    'programming',
    'painting',
  ]
});

renderer.render(
  <>
    Name:
    <input type='text' _state={dude.sub('name')}/>

    Age:
    <input type='number' _state={dude.sub('age')}/>

    Interests:
    <input type='text' _state={dude.sub('interests').sub(0)}/>
    <input type='text' _state={dude.sub('interests').sub(1)}/>

    <pre>{expr($ => JSON.stringify($(dude), null, 4))}</pre>
  </>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-substate.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-substate

<br>

> [local_library](:Icon) **FURTHER READING**
>
> States are directly exported from [callbag-state](https://github.com/loreanvictor/callbag-state),
> with special integrations with inputs and lists. Checkout [docs of that library](https://github.com/loreanvictor/callbag-state)
> for more information.

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>