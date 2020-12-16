import { should } from 'chai';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { InputStatePlugin } from 'render-jsx/dom/plugins';
import { CallbagInputStatePlugin } from '../input-state.plugin';
import { testCallbagInputStateSupport } from './spec/input-state.spec';

should();

describe('CallbagInputStatePlugin', () => {
  testCallbagInputStateSupport(
    (dom, ...plugins) => new LiveDOMRenderer(
      dom, ...plugins,
      () => new InputStatePlugin(),
      () => new CallbagInputStatePlugin(),
    ),
  );
});
