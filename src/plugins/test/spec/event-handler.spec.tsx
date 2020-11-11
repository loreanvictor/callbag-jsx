/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */

const subject = require('callbag-subject');

import subscribe from 'callbag-subscribe';
import { should, expect } from 'chai';
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike } from 'render-jsx';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { PluginFactory } from 'render-jsx/dist/es6/renderer';

should();

export function testCallbagEventHandlerSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => LiveDOMRenderer,
) {
  it('should send events to given callbag.', done => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);
    const e = new dom.Event('click');
    const sub = subject();

    subscribe((_e: any) => {
      _e.should.equal(e);
      done();
    })(sub);

    (<div onclick={sub}/>).dispatchEvent(e);
  });
}
