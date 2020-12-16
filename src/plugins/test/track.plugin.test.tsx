import { should } from 'chai';import { JSDOM } from 'jsdom';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { CallbagTrackPlugin } from '../track.plugin';
import { testCallbagTrackSupport } from './spec/track.spec';

should();

describe('CallbagTackPlugin', () => {
  const dom = new JSDOM().window;
  testCallbagTrackSupport<Node, LiveDOMRenderer>(
    (...plugins) => new LiveDOMRenderer(dom, ...plugins, () => new CallbagTrackPlugin()),
    () => dom.document.body,
  );
});
