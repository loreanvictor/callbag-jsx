<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Tracking</h1>
</div>

<br>

Use `this.track()` in component functions to track changes to a callbag
while your component is on-screen:

> :Tabs
> > :Tab title=Component Code
> > ```tsx | jinx-check.tsx
> > import { pipe, subscribe } from 'callbag-common';
> > 
> > 
> > export function JinxCheck({ source }, renderer) {
> > /*!*/  this.track(pipe(
> > /*!*/    source,
> > /*!*/    subscribe(v => {
> > /*!*/      if (v === 13) {
> > /*!*/        alert('JINX!');
> > /*!*/      }
> > /*!*/    }),
> > /*!*/  ));
> > 
> >   return <small>Jinx-Check is Active!</small>
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { JinxCheck } from './jinx-check';
> > 
> > const number = state(0);
> > const check = state(true);
> > 
> > renderer.render(
> >   <>
> >     <input _state={number} type='number'/> <br/>
> >     <input _state={check} type='checkbox'/> 
> >     <Conditional if={check}
> >       then={() => <JinxCheck source={number}/>}/>
> >   </>
> > ).on(document.body);
> > ```

<br>

<iframe height="256" deferred-src="https://callbag-jsx-demo-components-tracking.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components-tracking

<br>

👉 Tracking is useful for side-effects such as sending requests from user data:

```tsx
import { state } from 'callbag-state';
import { pipe, subscribe, filter, debounce, map } from 'callbag-common';

const POKEAPI = 'https://pokeapi.co/api/v2/pokemon/';

export function PokeInfo(_, renderer) {
  const name = state('');
  const pokemon = state<any>(undefined);
  const json = pipe(pokemon, map(p => JSON.stringify(p, null, 4)));

/*!*/  this.track(pipe(
/*!*/    name,
/*!*/    debounce(1000),                        // --> wait until typing is finished
/*!*/    filter(n => n.length > 0),             // --> filter out empty strings
/*!*/    subscribe(n => {
/*!*/      fetch(POKEAPI + n)                   // --> fetch pokemon info from PokeAPI
/*!*/        .then(r => r.json())               // --> convert response to JSON
/*!*/        .then(p => pokemon.set(p))
/*!*/        .catch(() => alert('Not Found!'))
/*!*/    })
/*!*/  ));

  return <>
    <input _state={name} type='text' placeholder='Pokemon name ...'/>
    <pre>{json}</pre>
  </>
}
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-components-pokeapi.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components-pokeapi

<br>

---

<br>

## Type Safety

It is recommended to type-annotate the `this` argument in TypeScript for further type-safety. For utilizing
tracking, you can use `TrackerComponentThis` interface for that purpose:

```tsx
import { TrackerComponentThis } from 'callbag-jsx';

export function MyComponent(
  this: TrackerComponentThis,
  ...
) {
  ...
}
```

<br>

> 👉 You can also annotate `this` with multiple types:
> ```tsx
> export function MyComponent(
>   this: TrackerComponentThis & LiveComponentThis,
>   ...
> ) {
> ...
> }
> ```


<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>