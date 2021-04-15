<div align="center">
  <img src="/docs/assets/callbag-jsx.svg" width="128px"/>
  <h1>How to Install</h1>
</div>

<br>

`callbag-jsx` itself is a small package that can be installed via [NPM](https://www.npmjs.com/package/callbag-jsx) 
(or yarn). However, `callbag-jsx` is best used when you code in JSX (which is an extension for JavaScript)
and not in pure JavaScript. For that purpose, you need a transpiler, that is configured to work properly with `callbag-jsx`.

<br>

---

<br>

## Starter Templates

`callbag-jsx` has two official starter templates to get you started quickly. Click on your preferred
template and follow the instructions on the README of the template repository.

<br>

| &nbsp; | <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" width="24" style="vertical-align: -2px"/> Template | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="24" style="vertical-align:-2px"/> Template |
| -------------------------------- | -------------------------------------------------------- | -------------------------------------- |
| <small>Transpiler</small>        | [Babel][3] <small>(plugin-transform-react-jsx)</small>   | [TypeScript][4]                        |
| <small>Dev Server</small>        | [Snowpack][11]                                           | [Snowpack][11]                         |
| <small>Bundler</small>           | [Webpack][5]                                             | [Webpack][5]                           |
| <small>Linter</small>            | [ESLint][5a]                                             | [typescript-eslint][5b]                |
| <small>Type Checking</small>     | No                                                       | Yes                                    |
| <small>Pipeline Operator</small> | Yes <small>(plugin-proposal-pipeline-operator)</small>   | No <small>(see [this isse][6])</small> |
| <small>Repository<small>         | [callbag-jsx-starter-js][7]                              | [callbag-jsx-starter-ts][8]            |
|                                  | [][9]                                                    | [][10]                                 |

[1]: https://github.com/loreanvictor/callbag-jsx-starter-js#readme
[2]: https://github.com/loreanvictor/callbag-jsx-starter-ts#readme
[3]: https://babeljs.io/
[4]: https://www.typescriptlang.org/
[5]: https://webpack.js.org/
[5a]: https://eslint.org/
[5b]: https://github.com/typescript-eslint/typescript-eslint
[6]: https://github.com/microsoft/TypeScript/issues/17718
[7]: https://github.com/loreanvictor/callbag-jsx-starter-js
[8]: https://github.com/loreanvictor/callbag-jsx-starter-ts
[9]: :Button (label=Use Template, url=https://github.com/loreanvictor/callbag-jsx-starter-js/generate)
[10]: :Button (label=Use Template, url=https://github.com/loreanvictor/callbag-jsx-starter-ts/generate)
[11]: https://www.snowpack.dev

<br>

> 👉 If you do not have a GitHub account or don't want the repo on GitHub,
> you can conveniently start a new project using [`degit`](https://github.com/Rich-Harris/degit):
> ```bash
> # get the files
> npx degit loreanvictor/callbag-jsx-starter-js
>
> # install dependencies
> npm i
>
> # start your project
> npm start
> ```

<br>

---

<br>

## Manual Installation

For manual installation, install the package via NPM (or yarn):

```bash
npm i callbag-jsx
```

<br>

To configure your transpiler to work with `callbag-jsx`, include the following
pragmas at the beginning of your `.tsx` / `.jsx` files:

```tsx
/** @jsx renderer.create */
/** @jsxFrag renderer.fragment */
```
> :Buttons
> > :CopyButton

<br>

👉 It is recommended to configure your transpiler on a project level instead of including per-file configs.
Here are how sample configurations would look like with popular build tools:

<br>

### Babel

```json | .babelrc
{
  "plugins": [
     ["@babel/plugin-transform-react-jsx", {
/*!*/       "pragma": "renderer.create",
/*!*/       "pragmaFrag": "renderer.fragment"
     }]
  ]
}
```

<br>

### TypeScript

```json | tsconfig.json
{
 "compilerOptions": {
/*!*/    "jsx": "react",
/*!*/    "jsxFactory": "renderer.create",
/*!*/    "jsxFragmentFactory": "renderer.fragment",
   "target": "es6",
   "declaration": false,
   "sourceMap": true,
   "moduleResolution": "node",
   "esModuleInterop": true,
   "allowSyntheticDefaultImports": true,
   "lib": [
     "es2017",
     "dom"
   ]
 },
 "include": [
   "./src/**/*",
 ]
}
```

<br>

### Snowpack

```js | snowpack.config.js
module.exports = {
  mount: { /* ... */ },
  plugins: [ /* ... */ ],
  packageOptions: { /* ... */ },
  devOptions: { /* ... */ },
  buildOptions: {
/*!*/    jsxFactory: 'renderer.create',
/*!*/    jsxFragment: 'renderer.fragment',
  },
}
```

<br>

> Though its not recommended, you CAN use `callbag-jsx` without JSX, and you would not need a transpiler as well.
> [Read this entry](/jsx) to learn more about using `callbag-jsx` without JSX.

<br>

---

<br>

## Using via CDN

Enable live JSX transpilation by adding this script to your head tag:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Now you can import and use Callbag JSX in your script tags:

```html
<script type="text/babel" data-type="module">
  /** @jsx renderer.create */
  /** @jsxFrag renderer.fragment */
  import { makeRenderer } from 'https://unpkg.com/callbag-jsx/dist/bundles/callbag-jsx.es.min.js'

  const renderer = makeRenderer()
  renderer.render(<div>Hellow World!</div>).on(document.body)
</script>
```

<br>

👉 If you need to import libraries that do not have ES bundles on their own, you can use [skypack](https://www.skypack.dev):

```jsx
import { state } from 'https://cdn.skypack.dev/callbag-state'
import { expr } from 'https://cdn.skypack.dev/callbag-expr'

const count = state(0);

const add = () => count.set(count.get() + 1)
const color = expr($ => $(count) % 2 ? 'red' : 'green')

renderer.render(
  <div onclick={add} style={{ color }}>
    You have clicked {count} times!
  </div>
).on(document.body)
```

<br>

---

<br>

### In Production

JSX transpilation in production is **NOT RECOMMENDED**, unless you don't have much code to begin with,
loading performance is not a particular concern, or you need to do live transpilation (e.g. online playgrounds).

👉 To disable JSX transpilation, simply do not import `@babel/standalone` script, and change your script tags to this:
```html
<script type="module">
  import { makeRenderer } from 'https://unpkg.com/callbag-jsx@0.1.13/dist/bundles/callbag-jsx.es.min.js'
  import { state } from 'https://cdn.skypack.dev/callbag-state'
  import { expr } from 'https://cdn.skypack.dev/callbag-expr'

  const renderer = makeRenderer()
  const count = state(0);

  const add = () => count.set(count.get() + 1);
  const color = expr($ => $(count) % 2 ? 'red' : 'green')

  renderer.render(
    renderer.create(
      'div',
      {
        onclick: add,
        style: { color }
      },
      'You have clicked ', count, ' times !'
    )
  ).on(document.body)
</script>
```

<br>

☝️ In production, also fix the version you are importing. In above example we have fixed `callbag-jsx@0.1.13`.

> Using `callbag-jsx` in this way means you cannot use JSX.
> [Read this entry](/jsx) to learn more about using `callbag-jsx` without JSX.


<br>

---

<br>

### In Older Browsers

Include the following script tag in your HTML header:

```html
<script src="https://unpkg.com/callbag-jsx/dist/bundles/callbag-jsx.es6.min.js"></script>
```

This script registers `callbagJSX` global variable. It is recommended to also add the following 
dependencies to your header as well:

```html
<script src="https://unpkg.com/callbag-state/dist/bundles/callbag-state.es6.min.js"></script>
<script src="https://unpkg.com/callbag-expr/dist/bundles/callbag-expr.es6.min.js"></script>
```

They will also register global variables `callbagState` and `callbagExpr` respectively.

```js
const { makeRenderer } = callbagJSX;
const { state } = callbagState;

const renderer = makeRenderer();

const s = state(0);

renderer.render(
  renderer.create('div', {}, 'You were here for ', s, ' seconds!')
).on(document.body);

setInterval(() => s.set(s.get() + 1), 1000);
```
> :Buttons
> > :Button label=Playground, url=https://jsbin.com/jihirayobu/1/edit?html,js,output

<br>

> 👉 For use on production, it is recommended to fetch specific versions of the bundles, i.e.
> ```html
> <script src="https://unpkg.com/callbag-jsx@0.1.13/dist/bundles/callbag-jsx.es6.min.js"></script>
> <script src="https://unpkg.com/callbag-state@0.2.5/dist/bundles/callbag-state.es6.min.js"></script>
> <script src="https://unpkg.com/callbag-expr@0.2.0/dist/bundles/callbag-expr.es6.min.js"></script>
> ```

<br>

> Using `callbag-jsx` in this way means you cannot use JSX.
> [Read this entry](/jsx) to learn more about using `callbag-jsx` without JSX.

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>