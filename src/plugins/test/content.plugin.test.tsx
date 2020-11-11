/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */

import state from 'callbag-state';
import { should, expect } from 'chai';import { JSDOM } from 'jsdom';
import { ContentPropPlugin } from 'render-jsx/common/plugins';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { ContentPlugin, Plugin } from 'render-jsx/plugin';
import { CallbagContentPlugin } from '../content.plugin';
import { testCallbagContentSupport } from './spec/content.spec';
 should();

describe('CallbagContentPlugin', () => {
  const dom = new JSDOM().window;
  testCallbagContentSupport<Node, LiveDOMRenderer>(
    (...plugins) => new LiveDOMRenderer(dom, ...plugins, () => new CallbagContentPlugin<Node>()),
    node => (node as HTMLElement).innerHTML,
    () => dom.document.body,
  );

  it('should be of fallback priority', done => {
    class P extends Plugin<Node, LiveDOMRenderer> implements ContentPlugin<Node, LiveDOMRenderer> {
      priority(): number { return Plugin.PriorityMax; }
      setContent() { done(); return true; }
    }

    const _dom = new JSDOM().window;
    const renderer = new LiveDOMRenderer(_dom).plug(
      () => new ContentPropPlugin<Node>(),
      () => new CallbagContentPlugin<Node>(),
      () => new P()
    );
    const s = state(42);
    <div _content={s}/>;
  });
});
