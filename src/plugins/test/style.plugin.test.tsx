import { should } from 'chai'; should();
import { LiveDOMRenderer } from 'render-jsx/dom';
import { CallbagStylePlugin } from '../style.plugin';
import { testCallbagStyleSupport } from './spec/style.spec';


describe('CallbagStylePlugin', () => {
  testCallbagStyleSupport(
    (dom, ...plugins) => new LiveDOMRenderer(dom, ...plugins, () => new CallbagStylePlugin()),
  );
});
