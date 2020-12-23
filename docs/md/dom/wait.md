<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Wait</h1>
</div>

<br>

Use `<Wait/>` when you want to show content based on data that is being fetched asynchronously:


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

By default, `<Wait/>` waits for the data to be fetched and then invokes given `then()` function.
This means that by default, DOM elements are created after the data is fully fetched.

The process can be sped up by using `<Wait/>` in concurrent mode. In this mode `then()` function
is invoked right away with a state instead of plain value which will resolve to data when data is fetched.
DOM elements returned will be kept in memory until data is loaded. This allows you to create
necessary DOM elements while data is being loaded and then updating them accordingly:

```tsx
renderer.render(
  <Wait concurrently
    for={fetch('https://pokeapi.co/api/v2/pokemon/charizard').then(res => res.json())}
    with={() => <>Loading ...</>}
    then={pokemon => <h1>{pokemon.sub('name')}</h1>}
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