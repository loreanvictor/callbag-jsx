<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>Under the Hood</h1>
</div>

<br>

```tsx
// Step 1: Element Creation
const x = <div class={y}>z {w}</div>;      // @see [explanation](#element-creation)

// Step 2: Rendering & Life-Cycle
renderer.render(x).on(document.body);      // @see [explanation](#rendering--life-cycle)
renderer.remove(x);                        // @see [explanation](#rendering--life-cycle)
```

To see what `callbag-jsx` does under the hood, we will go through this code step by step.

<br>

---

<br>

## Element Creation

```tsx
const x = <div class={y}>z {w}</div>;
```

As detailed [here](/jsx), this code is transpiled to this:

```tsx
const x = renderer.create('div', { 'class': y }, 'z', w);   // --> notice how tag is a string here
```

The `renderer` will now:

1. Ask all plugins to see if anyone wants to create the element for given tag (`'div'`)
2. Will pick the first plugin that accepts or use its own fallback mechanism:
  ```tsx
  document.createElement('div')
  ```

The `renderer` will then set the properties of this newly created element, again looking
for volunteering plugins first and falling back to default if no plugin accepts given property on given node.
For example, if `y` is a [callbag](/reactivity/callbags), then [`CallbagPropPlugin`](https://github.com/loreanvictor/callbag-jsx/blob/main/src/plugins/prop.plugin.ts) will be utilized, who will in turn add a life-cycle hook to the element
that subscribes to given callbag and updates the corresponding property when it emits:

```ts
renderer.hook(node, makeHook(target, value => renderer.setProp(node, prop, value)));
```

The same happens to children that are appended to the element. Plugins are consulted first, and fallback default
is used if none volunteers. In our example, if `w` is a callbag, then [`CallbagAppendPlugin`](https://github.com/loreanvictor/callbag-jsx/blob/main/src/plugins/append.plugin.ts) will create a leaf node (a text node) with a life-cycle hook for
subscribing into given callbag and updating the leaf's content accordingly, and appends given leaf node to target node
instead:

```ts
const leaf = renderer.leaf();

renderer.hook(leaf, makeHook(target, value => {
  renderer.setContent(leaf, value);
}));
renderer.append(leaf, host);
```

<br>

---

<br>

## Rendering & Life-Cycle

```tsx
renderer.render(x).on(document.body);
```

☝️ This will append `x` to body and _bind_ all of its life-cycle hooks. Each life-cycle hook
[looks like](https://github.com/loreanvictor/render-jsx/blob/af4039d8751090b71ca8430e1292c35a3c866bf9/src/renderer/types.ts#L22-L25) this:

```ts
interface LifeCycleHook {
  bind?(): void;
  clear?(): void;
}
```

👉 `bind()` will be called when the element is added to main document (appears on screen). \
👉 `clear()` will be called when the element is removed from main document.

A commonly used life-cycle hook is one that subscribes to a given callbag, which looks like this:

```ts
function makeHook(callbag, op) {
  let dispose;

  return {
    bind() { dispose = pipe(subscribe(callbag, op)) }
    clear() { dispose() }
  }
}
```

This ensures that given callbag is subscribed to while the element is on the screen, and the subscription
(and its associated resources) are cleared up when it is taken off-screen.

```tsx
renderer.remove(x);
```
☝️ This will remove `x` from main document, and _clear_ its life-cycle hooks.

<br>

---

<br>

## Components

```tsx
const x = <MyComponent property={y}/>;
```

☝️ This is transpiled to the following:

```tsx
const x = renderer.create(MyComponent, {property: y});   // --> notice how tag is not a string anymore
```
The same element creation steps are taken for this component. If `MyComponent` is a function,
then [`FunctionalComponentPlugin`](https://github.com/loreanvictor/render-jsx/blob/master/src/component/plugins/func-comp.plugin.ts)
will take over the element creation process:

```ts
class FunctionalComponentPlugin extends ComponentPlugin {
  match(component) {
    return typeof component.tag === 'function';      // --> only works for functions
  }

  create(component, provision) {
    return component.tag.apply(
      provision,                                     // --> will become the `this` argument
      [
        component.props,                             // --> the props dictionary, first argument
        this.renderer(),                             // --> the renderer object
        component.children                           // --> the children array
      ]);
  }
}
```
👉 There is a special type of renderer plugin named [`ComponentProcessor`](https://github.com/loreanvictor/render-jsx/blob/master/src/component/processor.ts). Processors can provide specific _provisions_ for each component (accessible via `this`, in
functional components), or run some side-effects on the elements returned by the component.

For example, [tracking](/components/tracking) is enabled by [`CallbagTrackPlugin`](https://github.com/loreanvictor/callbag-jsx/blob/main/src/plugins/track.plugin.ts), who roughly looks like this:

```tsx
class CallbagTrackPlugin extends ComponentProcessor {
  process(provide, post) {
    const tracked = [];

    provide({
      track: trackable => tracked.push(trackable)            // --> this becomes `this.track()`
    });

    post(node => tracked.forEach(
      t => this.renderer().hook(node, makeHook(t))
    ));
  }
}
```

> :Buttons
> > :Button label=Learn More, url=https://loreanvictor.github.io/render-jsx/docs/usage/custom-renderers/custom-component-processors

<br>

---

<br>

## Further Reading

`callbag-jsx` is an extension of [Render JSX](https://loreanvictor.github.io/render-jsx/). It basically
provides a set of [rendering plugins](https://github.com/loreanvictor/callbag-jsx/tree/main/src/plugins) that allow
embedding callbags in DOM elements, and some [helper components](https://github.com/loreanvictor/callbag-jsx/tree/main/src/components)
for dynamic lists, conditional DOM, etc.

It is highly recommended to checkout the docs for [Render JSX](https://loreanvictor.github.io/render-jsx/) itself
for learning more about how `callbag-jsx` operates under the hood.

> :Buttons
> > :Button label=Learn More, url=https://loreanvictor.github.io/render-jsx/

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>