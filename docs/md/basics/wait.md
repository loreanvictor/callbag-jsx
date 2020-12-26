<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Wait</h1>
</div>

<br>

```tsx
import { Wait } from 'callbag-jsx';

renderer.render(
  <Wait
    for={fetch('https://pokeapi.co/api/v2/pokemon/charizard').then(res => res.json())}
    with={() => <>Loading ...</>}
    then={pokemon => <h1>{pokemon.name}</h1>}
  />
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-wait.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-wait

<br>

👉 _with_ property is optional, and will be displayed while fetching data. \
👉 _for_ property is usually a promise. \
👉 _for_ property can also be a [callbag](/reactivity/callbags), in which case it will wait
for its next emission.


<br>

---

<br>

## Concurrent Rendering

By default, `<Wait/>` starts creating DOM elements after data is fetched.
This process can be sped up by creating DOM elements _while_ data is being fetched, and then updating them accordingly.

Pass `concurrently` flag to enable concurrent rendering.
Note that in concurrent mode, `then()` will be given
a [state](/reactivity/states) instead of a plain object.

```tsx
renderer.render(
/*!*/  <Wait concurrently
    for={fetch('https://pokeapi.co/api/v2/pokemon/charizard').then(res => res.json())}
    with={() => <>Loading ...</>}
/*!*/    then={pokemon => <h1>{pokemon.sub('name')}</h1>}
  />
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-wait-2.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-wait-2

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>