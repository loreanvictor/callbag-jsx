/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */

import { should, expect } from 'chai';
import { JSDOM } from 'jsdom';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { CallbagInputValuePlugin } from '../input-value.plugin';
import { testCallbagInputValueSupport } from './spec/input-value.spec';

should();

describe('CallbagInputValuePlugin', () => {
  testCallbagInputValueSupport(
    (dom, ...plugins) => new LiveDOMRenderer(
      dom, ...plugins,
      () => new CallbagInputValuePlugin(),
    ),
  );
});
