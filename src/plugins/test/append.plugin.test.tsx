/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable newline-before-return */

import state from 'callbag-state';
import { should } from 'chai';import { JSDOM } from 'jsdom';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { AppendPlugin, Plugin } from 'render-jsx/plugin';
import { CallbagAppendPlugin } from '../append.plugin';
import { testCallbagAppendSupport } from './spec/append.spec';

should();

describe('CallbagAppendPlugin', () => {
  const dom = new JSDOM().window;
  testCallbagAppendSupport<Node, LiveDOMRenderer>(
    (...plugins) => new LiveDOMRenderer(dom, ...plugins, () => new CallbagAppendPlugin<Node>()),
    node => (node as HTMLElement).innerHTML,
    () => dom.document.body,
  );

  it('should be of fallback priority', done => {
    class P extends Plugin<Node, LiveDOMRenderer> implements AppendPlugin<Node, LiveDOMRenderer> {
      priority(): number { return Plugin.PriorityMax; }
      append() { done(); return true; }
    }

    const _dom = new JSDOM().window;
    const renderer = new LiveDOMRenderer(_dom).plug(() => new CallbagAppendPlugin<Node>(), () => new P());
    const s = state(42);
    <div>{s}</div>;
  });
});
