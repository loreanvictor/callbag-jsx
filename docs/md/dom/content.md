<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Content</h1>
</div>

<br>

```tsx
const x = <div>Hellow World!</div>
```

<br>

👉 You can use JavaScript variables and expressions inside JSX content:

```tsx
const name = 'World';
const x = <div>Hellow {name}!</div>
```

```tsx
const x = <div>Hellow {name ? name : 'Stranger'}!</div>
```

---

## Dynamic Content

If your expression is a [callbag](/reactivity/callbags), then the element's content
will be updated when the callbag has new values.

```tsx
import interval from 'callbag-interval';

renderer.render(
  <div>You have been here {interval(1000)} seconds!</div>
).on(document.body);
```
<iframe deferred-src="https://callbag-jsx-demo-timer1.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-timer1?file=index.tsx

<br>

> 👉 Values of the provided callbag are only listened to while the element lives on the DOM:
> ```tsx
> const name = state('Jack');
> const div = <div>Hellow {name}!</div>;
> 
> console.log(div.textContent);           // > Hellow !
> 
> renderer.render(div).on(document.body); // --> now `div` starts listening to `name`
> console.log(div.textContent);           // > Hellow Jack!
> 
> name.set('John');                       // --> `div` updates itself with `name`
> console.log(div.textContent);           // > Hellow John!
> 
> renderer.remove(div);                   // --> `div` stops listening to `name`
> name.set('Jonas');                      // --> so this update will be missed
> console.log(div.textContent);           // > Hellow John!
> ```
>
> > :Buttons
> > > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-content-lifecycle

---

## Escaping

JSX content is escaped by default, so HTML strings would be rendered as if they were strings.
However sometimes it is useful to set content of an element directly to some HTML string,
similar to setting `element.innerHTML`.

To do this, simply set the `_content` attribute of your element:

```tsx
import marked from 'marked';

const input = state('');
const markdown = expr($ => marked($(input)));

renderer.render(<>
  <textarea _state={input} placeholder='type some markdown ...'/>
  <div _content={markdown}/>
</>).on(document.body);
```
<iframe deferred-src="https://callbag-jsx-demo-marked.stackblitz.io" height="256"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-marked

<br>

> ⚠️ **WARNING** ⚠️
>
> Using `_content` attribute might allow attackers to inject their own JavaScript
> into your webpage, which allows them access to data that otherwise would only be
> available to your own JavaScript (data such as cookies). This type of attack is known
> as [XSS attack](https://owasp.org/www-community/attacks/xss/) and the best way to
> protect against it is to check custom HTML generated from user input before
> adding it to the DOM.

<br><br>

> :ToCPrevNext