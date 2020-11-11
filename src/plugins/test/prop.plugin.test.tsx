/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */

import state from 'callbag-state';
import { should, expect } from 'chai'; should();
import { JSDOM } from 'jsdom';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { Plugin, PropPlugin } from 'render-jsx/plugin';
import { CallbagPropPlugin } from '../prop.plugin';
import { testCallbagPropSupport } from './spec/prop.spec';

describe('CallbagPropPlugin', () => {
  const dom = new JSDOM().window;
  testCallbagPropSupport<Node, LiveDOMRenderer>(
    (...plugins) => new LiveDOMRenderer(dom, ...plugins, () => new CallbagPropPlugin<Node>()),
    (node, prop) => (node as HTMLElement).getAttribute(prop)!!,
    () => dom.document.body,
  );

  it('should be of fallback priority', done => {
    class P extends Plugin<Node, LiveDOMRenderer> implements PropPlugin<Node, LiveDOMRenderer> {
      priority(): number { return Plugin.PriorityMax; }
      setProp() { done(); return true; }
    }

    const _dom = new JSDOM().window;
    const renderer = new LiveDOMRenderer(_dom).plug(
      () => new CallbagPropPlugin<Node>(),
      () => new P()
    );
    const s = state(42);
    <div title={s}/>;
  });
});
