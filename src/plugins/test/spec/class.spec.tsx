/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */

import { should, expect } from 'chai'; should();
import state from 'callbag-state';
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike, LiveRendererLike } from 'render-jsx';
import { PluginFactory } from 'render-jsx/dist/es6/renderer';
import { ClassPlugin } from 'render-jsx/dom/plugins';


export function testCallbagClassSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => LiveRendererLike<Node>,
) {
  it('should allow setting classes via callbags.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom, () => new ClassPlugin());

    const s = state('y1');
    const z = state(false);
    const d = <div class={['x', s, { w: true, z }]}/> as HTMLElement;
    renderer.render(d).on(dom.document.body);

    d.classList.value.should.equal('x w y1');
    s.set('y2');
    d.classList.value.should.equal('x w y2');
    z.set(true);
    d.classList.value.should.equal('x w y2 z');
  });
}
