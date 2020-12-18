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

<br>

> 👉 If you do not have a GitHub account or don't want the repo on GitHub, you can simply
> clone any of the template repos and reset the origin.

<br>

---

<br>

## Manual Installation

For manual installation, you can simply install the package via NPM (or yarn):

```bash
npm i callbag-jsx
```

<br>

To configure your transpiler to work with `callbag-jsx`, you can include the following
pragmas at the beginning of your `.tsx` / `.jsx` files:

```tsx
/** @jsx renderer.create */
/** @jsxFrag renderer.fragment */
```
> :Buttons
> > :CopyButton

<br>

> Though its not recommended, you CAN use `callbag-jsx` without JSX, and you would not need a transpiler as well.
> [Read this entry](/jsx) to learn more about using `callbag-jsx` without JSX.

<br>

Instead of per-file configuration, you can use transpiler-specific project-wide configurations as well.
If you are using Babel, your configuration should look like this:

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

Or if you are using TypeScript, your configuration should look something like this:

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

---

<br>

## Using via CDN

To add `callbag-jsx` to a webpage via a CDN, simply include the following script tag in your HTML header:

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
> <script src="https://unpkg.com/callbag-jsx@0.1.0/dist/bundles/callbag-jsx.es6.min.js"></script>
> <script src="https://unpkg.com/callbag-state@0.2.0/dist/bundles/callbag-state.es6.min.js"></script>
> <script src="https://unpkg.com/callbag-expr@0.2.0/dist/bundles/callbag-expr.es6.min.js"></script>
> ```

<br>

> Quite naturally, using `callbag-jsx` in this way means you cannot use JSX.
> [Read this entry](/jsx) to learn more about using `callbag-jsx` without JSX.

<br><br>

> :ToCPrevNext

<br><br>

<div align="center">
  <img src="/docs/assets/callbag.svg" width="256px"/>
</div>