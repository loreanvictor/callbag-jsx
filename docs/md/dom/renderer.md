<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Renderer</h1>
</div>

<br>

Callbag JSX is an extension of [Render JSX](https://loreanvictor.github.io/render-jsx/).
The `makeRenderer()` function returns a [DOM Renderer](https://loreanvictor.github.io/render-jsx/docs/usage/dom/overview)
with some callbag-related plugins plugged. You can recreate this function like this:

```ts
import { CommonDOMRenderer, LiveDOMRenderer } from 'render-jsx/dom'; // @see [Render JSX](https://loreanvictor.github.io/render-jsx/docs/usage/dom/overview)
import {
  CallbagAppendPlugin, CallbagPropPlugin, CallbagContentPlugin, CallbackTrackPlugin,
  CallbagInputValuePlugin, CallbagInputStatePlugin, CallbagEventHandlerPlugin,
  CallbagClassPlugin, CallbagStylePlugin,
} from 'callbag-jsx/plugins';


export function makeRenderer(dom?: DOMWindow) {
  return new CommonDOMRenderer(dom).plug(
    () => new CallbagAppendPlugin<Node>(),        // --> allows appending callbags to other nodes
    () => new CallbagPropPlugin<Node>(),          // --> allows setting node properties to callbags
    () => new CallbagContentPlugin<Node>(),       // --> allows setting `_content` attribute to callbags
    () => new CallbagTrackPlugin<Node>(),         // --> allows components to track callbags on their lifecycle hooks
    () => new CallbagInputValuePlugin(),          // --> allows input values being bound to callbags
    () => new CallbagInputStatePlugin(),          // --> allows input state sync with a callbag state
    () => new CallbagEventHandlerPlugin(),        // --> allows handling events by piping them to callbags
    () => new CallbagClassPlugin(),               // --> allows setting dynamic classes using callbags
    () => new CallbagStylePlugin(),               // --> allows setting dynamic styles using callbags
  ) as LiveDOMRenderer;
}
```

<br>

👉 You can plug these plugins into other [JSX renderers](https://loreanvictor.github.io/render-jsx/docs/usage/custom-renderers/core-concepts) (e.g. a native renderer) for enabling callbag support. \
👉 You can plug other plugins into your renderers for additional functionality.

> :Buttons
> > :Button url=https://loreanvictor.github.io/render-jsx/docs/usage/custom-renderers/core-concepts, label=Learn More

<br>

---

<br>

## Example: Date Plugin

In this example we create a custom plugin that allows us to render `Date` objects on the DOM:

> :Tabs
> > :Tab title=Usage
> > ```tsx | index.tsx
> > import { makeRenderer } from 'callbag-jsx';
> > /*!*/import { DatePlugin } from './date.plugin'; // @see tab:Plugin Code
> > 
> > /*!*/const renderer = makeRenderer().plug(() => new DatePlugin<Node>());
> > 
> > renderer.render(
> >   <>
> >     <h1>Hellow!</h1>
> > /*!*/    <p>Today is {new Date()}</p>
> >   </>
> > ).on(document.body);
> > ```
>
> > :Tab title=Plugin Code
> > ```ts | date.plugin.ts
> > import { AppendPlugin, Plugin } from 'render-jsx/plugin';
> > import { RendererLike } from 'render-jsx';
> > 
> > export class DatePlugin<N>
> >   extends Plugin<N, RendererLike<N>>
> >   implements AppendPlugin<N, RendererLike<N>> {
> >
> >   priority() { return Plugin.PriorityFallback; }
> >
> >   append(target: any, host: any) {
> >     if (target instanceof Date) {
> >       this.renderer().append(target.toDateString(), host);
> >       return true;
> >     }
> > 
> >     return false;
> >   }
> > }
> > ```

<iframe height="256" deferred-src="https://callbag-jsx-demo-plugin-date.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-plugin-date
>
> > :Button label=Learn More, url=https://loreanvictor.github.io/render-jsx/docs/usage/custom-renderers/custom-plugins#append-plugin

<br>

---

<br>

## Example: Config Plugin

In this example we create a custom plugin that provides given config
object to all components:

> :Tabs
> > :Tab title=Usage
> > ```tsx | greetings.tsx
> > function Greetings({ to }, renderer) {
> > /*!*/  return <h1>{this.config.greeting} {to}!</h1>;
> > }
> > ```
> > ```tsx | index.tsx
> > import { makeRenderer } from 'callbag-jsx';
> > /*!*/import { ConfigPlugin } from './config.plugin'; // @see tab:Plugin Code
> > import { Greetings } from './greetings';
> > 
> > /*!*/const renderer = makeRenderer()
> > /*!*/  .plug(() => new ConfigPlugin<Node>({
> > /*!*/    greeting: 'Hellow',
> > /*!*/  }));
> > 
> > renderer.render(
> >   <>
> >     <Greetings to='World'/>
> >     <p>Today is {new Date()}</p>
> >   </>
> > ).on(document.body);
> > ```
>
> > :Tab title=Plugin Code
> > ```ts | config.plugin.ts
> > import { ComponentProcessor } from 'render-jsx/component';
> > import { RendererLike } from 'render-jsx';
> > 
> > export class ConfigPlugin<N>
> >   extends ComponentProcessor<N, RendererLike<N>> {
> > 
> >   constructor(readonly config: any) { super(); }
> > 
> >   priority() { return ComponentProcessor.PriorityFallback; }
> > 
> >   process(provide) {
> >     provide({
> >       config: this.config
> >     });
> >   }
> > }
> > ```


<iframe height="256" deferred-src="https://callbag-jsx-demo-plugin-config.stackblitz.io/" />

> :Buttons
> > :Button label=Playground, url=https://stackblitz.com/edit/callbag-jsx-demo-plugin-config
>
> > :Button label=Learn More, url=https://loreanvictor.github.io/render-jsx/docs/usage/custom-renderers/custom-component-processors


<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>