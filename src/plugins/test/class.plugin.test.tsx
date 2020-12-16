import { should } from 'chai'; should();
import { LiveDOMRenderer } from 'render-jsx/dom';
import { CallbagClassPlugin } from '../class.plugin';
import { testCallbagClassSupport } from './spec/class.spec';


describe('CallbagClassPlugin', () => {
  testCallbagClassSupport(
    (dom, ...plugins) => new LiveDOMRenderer(dom, ...plugins, () => new CallbagClassPlugin()),
  );
});
