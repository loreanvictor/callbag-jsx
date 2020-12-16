/* eslint-disable @typescript-eslint/no-unused-vars */

import subject from 'callbag-subject';

import subscribe from 'callbag-subscribe';
import { should } from 'chai';
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
