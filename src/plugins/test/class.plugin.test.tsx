/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */


import { should, expect } from 'chai'; should();
import { LiveDOMRenderer } from 'render-jsx/dom';
import { CallbagClassPlugin } from '../class.plugin';
import { testCallbagClassSupport } from './spec/class.spec';


describe('CallbagClassPlugin', () => {
  testCallbagClassSupport(
    (dom, ...plugins) => new LiveDOMRenderer(dom, ...plugins, () => new CallbagClassPlugin()),
  );
});
