<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Components</h1>
</div>

<br>

Components are functions for rendering parts of the UI:

> :Tabs
> > :Tab title=Component Code
> > ```tsx | greetings.tsx
> > export function Greetings({to}, renderer) {
> >   return <h1>Hellow {to}!</h1>;
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { Greetings } from './greetings';
> > 
> > renderer.render(
> >   <Greetings to='World'/>
> > ).on(document.body);
> > ```

<br>

<iframe height="192" deferred-src="https://callbag-jsx-demo-components-1.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components-1

```tsx
const records = state([]);
const add = () => records.set(records.get().concat(new Date()));
const clear = () => records.set([]);

/*!*/function Record({ record }, renderer) {
/*!*/  const remove = () => records.set(records.get().filter(r => r !== record.get()));
/*!*/
/*!*/  return <div>{ record } <button onclick={remove}>X</button></div>
/*!*/}

renderer.render(
  <>
    <button onclick={add}>Add</button>
    <button onclick={clear}>Clear</button>
    <List of={records} each={record => <Record record={record}/>}/>
  </>
).on(document.body);
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-components.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components

<br>

> [verified_user](:Icon) **TYPE SAFETY**
>
> If you are using TypeScript, it is recommended to properly type-annotate your components for
> easier and safer re-use:
> ```ts
> import { Source } from 'callbag-common';
> import { RendererLike } from 'render-jsx';
>
> export interface GreetingsProps {
>   to: string | Source<string>
> }
>
> export function Greetings(props: GreetingsProps, renderer: RendererLike<Node>) {
>   return <h1>Hello {props.to}!</h1>;
> }
> ```

<br>

---

<br>

## Naming Rules

Component function names **MUST** start with uppercase letters:
```tsx
// 🚫 WRONG:
function myComponent(...) { ... }

// ✅ CORRECT:
function MyComponent(...) { ... }
```

<br>


The second argument of a component function **MUST** be named `renderer`:
```tsx
// 🚫 WRONG:
function MyComp() { return /*~*/<h1>Hellow!</h1>/*~*/ }   // --> renderer is not defined

// ✅ CORRECT:
function MyComp(_, renderer) { return <h1>Hellow!</h1> }
```

> :Buttons
> > :Button label=Learn Why, url=/jsx#renderer-object

<br>

---

<br>

## Children

Child elements are passed to component functions as the third argument:

> :Tabs
> > :Tab title=Component Code
> > ```tsx | card.tsx
> > export function Card(_, renderer, children) {
> >   return <div style={{
> >     display: 'inline-block',
> >     'border-radius.px': 7,
> >     'padding.px': 16,
> >     'box-shadow': '0 3px 6px rgba(0, 0, 0, .25)',
> >   }}>
> >     {children}
> >   </div>;
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { Card } from './card';
> > 
> > renderer.render(
> >   <Card>
> >     Hellow There!
> >   </Card>
> > ).on(document.body);
> > ```

<br>

<iframe height="256" deferred-src="https://callbag-jsx-demo-components-2.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components-2

<br>

👉 `children` is an array of child elements passed to the component:

> :Tabs
> > :Tab title=Component Code
> > ```tsx | unordered-list.tsx
> > export function UnorderedList(_, renderer, children) {
> >   return <ul>
> >     {children.map(child => <li>{child}</li>)}
> >   </ul>;
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { UnorderedList } from './unordered-list';
> > 
> > renderer.render(
> >   <UnorderedList>
> >     Hellow There!
> >     <span>How are you doing?</span>
> >     <div>Huh this is relatively neat</div>
> >   </UnorderedList>
> > ).on(document.body);
> > ```

<br>

<iframe height="256" deferred-src="https://callbag-jsx-demo-components-3.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components-3

<br>

👉 For named child slots, it is recommended to use properties:

> :Tabs
> > :Tab title=Component Code
> > ```tsx | unordered-list.tsx
> > export function UnorderedList({footer}, renderer, children) {
> >   return <>
> >     <ul>
> >       {children.map(child => <li>{child}</li>)}
> >     </ul>
> >     { footer || '' }
> >   </>;
> > }
> > ```
>
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { UnorderedList } from './unordered-list';
> > 
> > renderer.render(
> >   <UnorderedList footer={<>This is the end</>}>
> >     Hellow There!
> >     <span>How are you doing?</span>
> >     <div>Huh this is relatively neat</div>
> >   </UnorderedList>
> > ).on(document.body);
> > ```

<br>

<iframe height="256" deferred-src="https://callbag-jsx-demo-components-4.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components-4

---

<br>

## Life-Cycle

Component functions are called only once, when they are used within JSX:

```tsx
const Z = <MyComp x={42}/>     {/* --> MyComp() is called once here*/}
```
☝️ This is _roughly_ equivalent to the following:
```tsx
const Z = MyComp({ x: 42 }, renderer)
```

<br>

A component has two other important life-cycle events as well:
- **Bind**: when the elements it has created are added to the main document.
- **Clear**: when the elements it has created are removed from the main document.

You can hook into these events using [hooks](/components/hooks):

```tsx
function MyComponent(...) {
  this.onBind(() => ...)
  this.onClear(() => ...)
}
```

> :Buttons
> > :Button label=Learn More, url=/components/hooks

👉 More conveniently, you can [track](/components/tracking) callbags (or subscriptions):

```tsx
export function JinxCheck({ source }, renderer) {
  this.track(pipe(
    source,
    subscribe(v => {
      if (v === 13) {
        alert('JINX!');
      }
    }),
  ));

  return <small>Jinx-Check is Active!</small>
}
```

<iframe height="256" deferred-src="https://callbag-jsx-demo-components-tracking.stackblitz.io/"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-components-tracking
>
> > :Button label=Learn More, url=/components/tracking

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>