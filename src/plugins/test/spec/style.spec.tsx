import { should } from 'chai'; should();
import expr from 'callbag-expr';
import state from 'callbag-state';
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike, LiveRendererLike } from 'render-jsx';
import { PluginFactory } from 'render-jsx/dist/es6/renderer';
import { StylePlugin } from 'render-jsx/dom/plugins';


export function testCallbagStyleSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => LiveRendererLike<Node>,
) {
  it('should allow setting style values via callbags.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom, () => new StylePlugin());

    const r = state(0);
    const s = state(1);
    const d = <div style={{
      transform: expr($ => ({ 'rotate.deg': $(r), scale: $(s) })),
      color: 'blue'
    }}/> as HTMLElement;
    renderer.render(d).on(dom.document.body);
    d.style.color.should.equal('blue');
    d.style.transform.should.equal('rotate(0deg) scale(1)');
    r.set(45);
    d.style.transform.should.equal('rotate(45deg) scale(1)');
    s.set(1.5);
    d.style.transform.should.equal('rotate(45deg) scale(1.5)');
  });
}
