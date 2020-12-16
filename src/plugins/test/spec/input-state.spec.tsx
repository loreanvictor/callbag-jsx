import subscribe from 'callbag-subscribe';
import subject from 'callbag-subject';
import state from 'callbag-state';
import { should } from 'chai';
import { DOMWindow, JSDOM } from 'jsdom';
import { RendererLike } from 'render-jsx';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { PluginFactory } from 'render-jsx/dist/es6/renderer';

should();

export function testCallbagInputStateSupport(
  factory: (dom: DOMWindow, ...plugins: PluginFactory<Node, RendererLike<Node>>[]) => LiveDOMRenderer,
) {
  it('should send pass values of the input to given callbag.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);
    const sub = subject();
    const res: string[] = [];

    subscribe((_e: any) => {
      res.push(_e);
    })(sub);

    const i = <input _state={sub} value='A' type='text'/>;
    renderer.render(i).on(dom.document.body);
    (i as HTMLInputElement).value = 'B';
    i.dispatchEvent(new dom.Event('input'));

    res.should.eql(['A', 'B']);
  });

  it('should pass values of the textarea to given callbag.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);
    const sub = subject();
    const res: string[] = [];

    subscribe((_e: any) => {
      res.push(_e);
    })(sub);

    const i = <textarea _state={sub}>A</textarea>;
    renderer.render(i).on(dom.document.body);
    (i as HTMLTextAreaElement).value = 'B';
    i.dispatchEvent(new dom.Event('input'));

    res.should.eql(['A', 'B']);
  });

  it('should pass values of the select to given callbag.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);
    const sub = subject();
    const res: string[] = [];

    subscribe((_e: any) => {
      res.push(_e);
    })(sub);

    const i = <select _state={sub}>
      <option selected>A</option>
      <option>B</option>
    </select>;
    renderer.render(i).on(dom.document.body);
    (i as HTMLSelectElement).options.item(1)!!.selected = true;
    i.dispatchEvent(new dom.Event('input'));

    res.should.eql(['A', 'B']);
  });

  it('should set the input value based on values emitted from the callbag.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);
    const sub = subject();

    const i = <input _state={sub} type='text'/>;
    renderer.render(i).on(dom.document.body);

    sub(1, 'A'); i.value.should.equal('A');
    sub(1, 'B'); i.value.should.equal('B');
  });

  it('should set the input value to the initial value of the callbag.', () => {
    const dom = new JSDOM().window;
    const renderer = factory(dom);
    const st = state('Hola');

    const i = <input _state={st} type='text'/>;
    renderer.render(i).on(dom.document.body);

    i.value.should.equal('Hola');
  });
}
