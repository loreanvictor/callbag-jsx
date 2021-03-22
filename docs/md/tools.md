<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Tools & Utilities</h1>
</div>

<br>

For most real-life application you would need some utilities alongside `callbag-jsx`. Here are
a list of libraries for most common use cases such as state management, routing and testing.

> 👉 `callbag-jsx` is pretty flexible and can be used with _any_ other library. Libraries
> mentioned here are merely a recommendation for getting started.

<br>

> 👉 Some of mentioned libraries are included by default in starter templates. These libraries
> are marked with a star ⭐

<br>

---

<br>

## State Management

Because `callbag-jsx` is designed around seamless embedding of [callabgs](/reactivity/callbags) in JSX, the most
convenient tools for data-flow management are naturally [those that are callbag based](https://github.com/callbag/callbag/wiki).
Specifically the following libraries are recommended:

- ⭐ [callbag-common](https://github.com/loreanvictor/callbag-common): Commonly used utilities for working with callbags
- ⭐ [callbag-state](https://github.com/loreanvictor/callbag-state): State management with callbags

<br>

Alternatively, you could use any of the following libraries:

- [callbag-basics](https://github.com/staltz/callbag-basics):  Basic callbag utilities
- [callbag-subject](https://github.com/staltz/callbag-subject):
A listener sink that is also a listenable source, like [RxJS Subject](https://rxjs-dev.firebaseapp.com/guide/subject)
- [callbag-behavior-subject](https://github.com/zebulonj/callbag-behavior-subject):
A subject that repeats its last value on connection (like [RxJS Behavior Subject](https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject))
- [reduxbag](https://github.com/jamesb3ll/reduxbag): Redux middleware for callbags


<br>

👉 Checkout [callbag wiki](https://github.com/callbag/callbag/wiki) for a list of callbag-based
tools for state and data-flow management.


<br>

---

<br>

## Routing

You can use [callbag-router](https://github.com/loreanvictor/callbag-router) for client-side routing:

```tsx
import { Route } from 'callbag-router'
import { pipe, map } from 'callbag-common'
import { makeRenderer } from 'callbag-jsx'

const renderer = makeRenderer()
renderer.render(
  <>
    <Route
      path='/hellow/:name'
      component={params => <div>Hellow {params.name}!</div>}
    />
    <Route path='/goodbye' component={() => <div>GoodBye!</div>}/>
  </>
).on(document.body)
```

> :Buttons
> > :Button label=Learn More, url=https://github.com/loreanvictor/callbag-router#readme

<br>

---

<br>

## Styling & Themes

If you are a fan of CSS-in-JS, [themed-jss](https://github.com/loreanvictor/themed-jss) specifically
provides integration with `callbag-jsx`. It also handles theming and automatically manages dark mode:

> :Tabs
> > :Tab title=Component Code
> > ```tsx | my-btn.tsx
> > import { style, when } from 'themed-jss'
> > import { DarkMode } from 'themed-jss/dark-mode'
> > 
> > const MyBtnStyle = style(theme => ({
> >   btn: {
> >     color: theme.background,
> >     background: theme.text,
> >     border: `2px solid ${theme.text}`,
> >     padding: 8,
> >     borderRadius: 3,
> >     cursor: 'pointer',
> > 
> >     [when(':hover')]: {
> >       color: theme.text,
> >       background: 'transparent !darkmode',
> >     }
> >   }
> > }))
> > 
> > export function MyBtn(_, renderer) {
> >   const { btn } = this.theme.classes(MyBtnStyle);
> > 
> >   return (
> >     <button class={btn} onclick={() => DarkMode.toggle()}>
> >       Toggle Dark Mode
> >     </button>
> >   )
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { theme } from 'themed-jss'
> > import { themePlug } from 'themed-jss/jsx'
> > 
> > const myTheme = theme({
> >   text: 'black',
> >   background: 'white',
> > }, {
> >   text: 'white',
> >   background: 'black'
> > })
> > 
> > const renderer = makeRenderer().plug(themePlug(myTheme))
> > renderer.render(<MyBtn/>).on(document.body)

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-themed-jss-demo?file=my-btn.tsx
>
> > :Button label=Learn More, url=https://github.com/loreanvictor/themed-jss#readme

<br>

---

<br>

## Testing

⭐ [test-callbag-jsx](https://github.com/loreanvictor/test-callbag-jsx) is specifically designed to make
testing `callbag-jsx` code convenient:

```tsx
import { testRender } from 'test-callbag-jsx'
import { should } from 'chai'

import { RemovableHellow } from './removable-hellow'

should()

describe('RemovableHellow', () => {
  it('should say hellow and then be removed when clicked', () => {

/*!*/    testRender((renderer, { render, $ }) => {
/*!*/      render(<RemovableHellow name='Jack'/>)
/*!*/      $('body').text().should.equal('Hellow Jack!')
/*!*/
/*!*/      $('body :first-child').click()
/*!*/      $('body').text().should.equal('')
/*!*/    })

  })
})
```
> :Buttons
> > :Button label=Learn More, url=https://github.com/loreanvictor/test-callbag-jsx

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>
