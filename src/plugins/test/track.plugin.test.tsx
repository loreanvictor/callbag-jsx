/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */


import { should, expect } from 'chai';import { JSDOM } from 'jsdom';
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
