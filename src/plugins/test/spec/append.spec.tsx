/* tslint:disable: no-magic-numbers */
/* tslint:disable: no-unused-expression */
/* tslint:disable: newline-before-return */

import { should, expect } from 'chai'; should();
import { state } from 'callbag-state';
import { LiveRendererLike } from 'render-jsx';
import { PluginFactory } from 'render-jsx/dist/es6/renderer';


export function testCallbagAppendSupport<N, R extends LiveRendererLike<N>>(
  factory: (...plugins: PluginFactory<N, R>[]) => R,
  getContent: (n: N) => string,
  livelyRoot: () => N,
) {
  it('should update contents using given callbag.', () => {
    const renderer = factory();

    const name = state('World');
    const div = <div>Hellow {name}!</div>;
    renderer.render(div).on(livelyRoot());
    expect(getContent(div)).to.equal('Hellow World!');
    name.set('Jack');
    expect(getContent(div)).to.equal('Hellow Jack!');
  });

  it('should unsubscribe from given callbag when the node is removed.', done => {
    const renderer = factory();

    const name = (t: 0 | 1 | 2, d?: any) => {
      if (t === 0) {
        d(0, (_t: 2) => done());
        d(1, 'World');
      }
    };
    const div = <div>Hellow {name}!</div>;
    renderer.render(div).on(livelyRoot());
    getContent(div).should.equal('Hellow World!');
    renderer.remove(div);
  });

  it('should properly handle already terminated callbags on removal.', () => {
    const renderer = factory();

    let _D: any;
    const name = (t: 0 | 1 | 2, d?: any) => {
      if (t === 0) {
        d(0, (_t: 2) => { throw Error('should not have got here!'); });
        d(1, 'World');
        _D = d;
      } else if (t === 2) {
        _D(2);
      }
    };
    const div = <div>Hellow {name}!</div>;
    renderer.render(div).on(livelyRoot());
    getContent(div).should.equal('Hellow World!');
    name(2);
    renderer.remove(div);
  });

  it('should only update when value of the callbag is changed (by reference).', () => {
    const renderer = factory();

    const name = state([1, 2, 3]);
    const div = <div>{name}</div>;
    renderer.render(div).on(livelyRoot());
    expect(getContent(div)).to.equal('1,2,3');
    name.sub(1).set(4);
    expect(getContent(div)).to.equal('1,2,3');
    name.get().should.eql([1, 4, 3]);
  });

  it('should not panic when source callbag sends weird signals.', () => {
    const renderer = factory();

    const name = (_: 0, d?: any) => d(5);
    const div = <div>Hellow {name}!</div>;
    renderer.render(div).on(livelyRoot());
  });
}
