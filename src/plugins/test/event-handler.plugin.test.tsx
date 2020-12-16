/* eslint-disable @typescript-eslint/no-unused-vars */

import { should } from 'chai';import { JSDOM } from 'jsdom';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { EventHandlerPlugin } from 'render-jsx/dom/plugins';
import { CallbagEventHandlerPlugin } from '../event-handler.plugin';
import { testCallbagEventHandlerSupport } from './spec/event-handler.spec';

should();

describe('CallbagEventHandlerPlugin', () => {
  testCallbagEventHandlerSupport(
    (dom, ...plugins) => new LiveDOMRenderer(
      dom, ...plugins,
      () => new EventHandlerPlugin(),
      () => new CallbagEventHandlerPlugin(),
    ),
  );

  it('should ignore when given handler is not a callbag.', done => {
    const dom = new JSDOM().window;
    const renderer = new LiveDOMRenderer(dom).plug(() => new CallbagEventHandlerPlugin());

    (<div onclick={() => done() }/>).dispatchEvent(new dom.Event('click'));
    done();
  });
});
