<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Conditionals</h1>
</div>

<br>

```tsx
import { Conditional } from 'callbag-jsx';

const show = state(true);

renderer.render(<>
  <input type='checkbox' _state={show}/> Show stuff
  <Conditional if={show}
    then={() => <div>🦄🪕Stuff Are Shown ... 🪕🦄</div>}
    else={() => <div>Not showing stuff</div>}
  />
</>).on(document.body);
```

<iframe deferred-src="https://callbag-jsx-demo-conditional.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-conditional

<br>

```tsx
const timer = interval(1000);

renderer.render(
  <Conditional if={expr($ => $(timer, 0) % 2)}
    then={() => <div>✋ Hellow!</div>}
  />
).on(document.body);
```
<iframe deferred-src="https://callbag-jsx-demo-conditional-2.stackblitz.io" height="192"/>

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-conditional-2

> [info](:Icon (align=-6px)) provided `then()` and `else()` functions will be called everytime
> the value of the conditional changes, and the whole DOM tree will be replaced with their return
> result. For simply showing/hiding some content, `hidden` attribute might be a better option
> depending on the situation.

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>