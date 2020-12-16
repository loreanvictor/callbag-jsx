import subject from 'callbag-subject';

import { should } from 'chai';
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike } from 'render-jsx';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { PluginFactory } from 'render-jsx/dist/es6/renderer';

should();

export function testCallbagInputValueSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => LiveDOMRenderer,
) {
  it('should set the input value based on values emitted from the callbag.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);
    const sub = subject();

    const i = <input value={sub} type='text'/>;
    renderer.render(i).on(dom.document.body);

    sub(1, 'A'); i.value.should.equal('A');
    sub(1, 'B'); i.value.should.equal('B');
  });
}
