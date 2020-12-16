import { should } from 'chai';
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
