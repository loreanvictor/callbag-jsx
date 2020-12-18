<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Comparison with Other Frameworks</h1>
</div>

<br>

> [speed](:Icon (align=-6px)) **A note on performance**
>
> All frameworks mentioned in this comparison are _fast enough_ for most use cases,
> and can be further optimized if need be.
>
> `callbag-jsx` was born out of circumstances were _fast enough_ was not enough, and a realization
> that because all existing frameworks are designed around the framework detecting and propagating
> change, most optimizations are equivalent to suppressing the framework and taking manual
> control.
>
> In contrast, `callbag-jsx` aims at providing that control as its core principle,
> trying its best to make it as convenient as existing tools and frameworks without
> getting in the way.

<br>

> [widgets](:Icon (align=-6px)) **A note on maturity**
>
> Needless to say that all mentioned tools and frameworks are MUCH more mature
> and with thriving eco-systems. This means that if you want to
> do something, there is a much higher chance of finding a package
> designed specifically to do that when using these tools and frameworks, where as in case of `callbag-jsx`
> you most probably would need to develop it from scratch.


<br><br>

## ![](https://reactjs.org/favicon.ico) React

React and `callbag-jsx` _stylishly_ share a lot of concepts, from JSX to state management:

<br>

> :Tabs
> > :Tab title=React
> > ```jsx
> > import React, { useState } from 'react';
> > import ReactDOM from 'react-dom';
> > 
> > function App() {
> >   const [todos, setTodos] = useState([{title: 'Do this'}, {title: 'Do that'}]);
> >   const [next, setNext] = useState('');
> > 
> >   const add = () => {
> >     setTodos(todos.concat([{title: next}]));
> >     setNext('');
> >   };
> > 
> >   return (<>
> >     <h1>Todos</h1>
> >     <ol>
> >       {todos.map(todo => <li>{todo.title}</li>)}
> >     </ol>
> >     <input type='text' value={next}
> >       onChange={event => setNext(event.target.value)} 
> >       placeholder='What should be done?'/>
> >     <button onClick={add}>Add</button>
> >   </>);
> > }
> > 
> > ReactDOM.render(<App />, document.getElementById("root"));
> > ```
>
> > :Tab title=Callbag-JSX
> > ```tsx
> > import { makeRenderer, List } from 'callbag-jsx';
> > import { state } from 'callbag-state';
> > 
> > const renderer = makeRenderer();
> > 
> > const todos = state([{title: 'Do this'}, {title: 'Do that'}]);
> > const next = state('');
> > 
> > const add = () => {
> >   todos.set(todos.get().concat([{title: next.get()}]));
> >   next.set('');
> > };
> > 
> > renderer.render(<>
> >   <h1>Todos</h1>
> >   <ol>
> >     <List of={todos} each={todo => <li>{todo.sub('title')}</li>}/>
> >   </ol>
> >   <input type='text' _state={next} placeholder='What should be done?'/>
> >   <button onclick={add}>Add</button>
> > </>).on(document.body);
> > ```

<br>

The main difference stems from how this API is achieved: in React, this is basically
_emulated_ by virtual DOM and hooks, while in `callbag-jsx`, it is achieved
by explicit use of callbags. As a result, `callbag-jsx` is faster than React (it does less work) 
and has a smaller bundle size (it needs less code),
while providing more control (e.g. debouncing) and being more robust (e.g. free modification of the DOM).

<br>

👉 However, `callbag-jsx` is more verbose on reactivity. In React, simple JS expressions _just work_:
```jsx
<div>{myArray.length + 1}</div>
```
In `callbag-jsx`, you need to use explicitly reactive expressions:
```tsx
<div>{expr($ => $(myArray).length + 1)}</div>
```

<br>

👉 Additionally, React does impose more structure as it requires developers to break everything into
components, while `callbag-jsx` leaves that completely up to developers.

---

## ![](https://angular.io/assets/images/favicons/favicon.ico) Angular

Imagine Angular, but everything is an observable and async pipe is used by default everywhere.
Drop everything else from the framework, and you get something pretty close to `callbag-jsx`.

Because of this, `callbag-jsx` is faster than Angular with a (much) smaller bundle size,
in exchange for being more verbose on reactivity (similar to React).
It is notable that Angular also has much more boilerplate code
and imposes much stricter structure than `callbag-jsx`.

<br>

> It is also notable that Angular is a complete framework equipped with most of the basics you would need
> for developing an app. `callbag-jsx` on the other hand is just a rendering library, which means
> you would need complementary tools alongside it for any proper application.

---

## ![](https://vuejs.org/images/logo.png) Vue.js

Vue.js and `callbag-jsx` share some notions in reactive state management, specifically with computed
properties and reactive expressions. Vue.js is also built around robustness, simplicity and interoperability
compared to React and Angular, and also tends to track changes much more precisely
than those frameworks.

The end result is that while `callbag-jsx` is still faster, smaller and more robust than Vue.js, the
difference, specifically in terms of performance, is less pronounced compared to Angular or React.

<br>

👉 Vue.js has a strict separation of HTML, CSS and JavaScript, while `callbag-jsx` is JSX based
and generally more aligned towards _Everything-in-JS_ style. Vue.js also imposes more structure on
the app where as `callbag-jsx` imposes none.

<br>

👉 `callbag-jsx` is more interoperable / customizable / robust. It does not use virtual DOM so
it is more robust in face of manual / external modifications to DOM, and its reactivity system
is an independent specification (i.e. callbags).


<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>