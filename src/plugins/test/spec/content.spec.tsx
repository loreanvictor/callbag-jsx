import { should, expect } from 'chai'; should();
import { state } from 'callbag-state';
import { LiveRendererLike, RendererLike } from 'render-jsx';
import { ContentPropPlugin } from 'render-jsx/common/plugins';
import { PluginFactory } from 'render-jsx/dist/es6/renderer';


export function testCallbagContentSupport<N, R extends LiveRendererLike<N>>(
  factory: (...plugins: PluginFactory<N, RendererLike<N>>[]) => R,
  getContent: (n: N) => string,
  livelyRoot: () => N,
) {
  it('should update contents using given callbag.', () => {
    const renderer = factory(() => new ContentPropPlugin<N>());

    const c = state('Hellow World!');
    const div = <div _content={c}/>;
    renderer.render(div).on(livelyRoot());
    expect(getContent(div)).to.equal('Hellow World!');
    c.set('Goodbye Blue Sky!');
    expect(getContent(div)).to.equal('Goodbye Blue Sky!');
  });

  it('should unsubscribe from given callbag when the node is removed.', done => {
    const renderer = factory(() => new ContentPropPlugin<N>());

    const c = (t: 0 | 1 | 2, d?: any) => {
      if (t === 0) {
        d(0, (_t: 2) => done());
        d(1, 'All work and no play');
      }
    };
    const div = <div _content={c}/>;
    renderer.render(div).on(livelyRoot());
    getContent(div).should.equal('All work and no play');
    renderer.remove(div);
  });

  it('should properly handle already terminated callbags on removal.', () => {
    const renderer = factory(() => new ContentPropPlugin<N>());

    let _D: any;
    const c = (t: 0 | 1 | 2, d?: any) => {
      if (t === 0) {
        d(0, (_t: 2) => { throw Error('should not have got here!'); });
        d(1, 'Halo meine liebe');
        _D = d;
      } else if (t === 2) {
        _D(2);
      }
    };
    const div = <div _content={c}/>;
    renderer.render(div).on(livelyRoot());
    getContent(div).should.equal('Halo meine liebe');
    c(2);
    renderer.remove(div);
  });

  it('should only update when value of the callbag is changed (by reference).', () => {
    const renderer = factory(() => new ContentPropPlugin<N>());

    const c = state([1, 2, 3]);
    const div = <div _content={c}/>;
    renderer.render(div).on(livelyRoot());
    expect(getContent(div)).to.equal('1,2,3');
    c.sub(1).set(4);
    expect(getContent(div)).to.equal('1,2,3');
    c.get().should.eql([1, 4, 3]);
  });

  it('should not panic when source callbag sends weird signals.', () => {
    const renderer = factory(() => new ContentPropPlugin<N>());

    const c = (_: 0, d?: any) => d(5);
    const div = <div _content={c}/>;
    renderer.render(div).on(livelyRoot());
  });
}
