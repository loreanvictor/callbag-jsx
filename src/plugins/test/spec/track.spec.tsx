/* eslint-disable @typescript-eslint/no-unused-vars */

import { LiveRendererLike, RendererLike } from 'render-jsx';
import { ref } from 'render-jsx/common';
import { RefPlugin } from 'render-jsx/common/plugins';
import { FunctionalComponentPlugin } from 'render-jsx/component/plugins';
import { PluginFactory } from 'render-jsx/dist/es6/renderer';
import { TrackerComponentThis } from '../../track.plugin';


export function testCallbagTrackSupport<N, R extends LiveRendererLike<N>>(
  factory: (...plugins: PluginFactory<N, RendererLike<N>>[]) => R,
  livelyRoot: () => N,
) {
  it('should subscribe to given callbag when it is tracked.', done => {
    const renderer = factory(() => new FunctionalComponentPlugin<N, R>());

    function MyComp(this: TrackerComponentThis) {
      this.track((t: 0 | 1 | 2, d?: any) => {
        if (t === 0) { done(); }
      });

      return <div/>;
    }

    renderer.render(<MyComp/>).on(livelyRoot());
  });

  it('should unsubscribe from tracked callbags when the node is removed.', done => {
    const renderer = factory(() => new FunctionalComponentPlugin<N, R>(), () => new RefPlugin());

    function MyComp(this: TrackerComponentThis) {
      this.track((t: 0 | 1 | 2, d?: any) => {
        if (t === 0) {
          d(0, (_t: 2) => {
            if (_t === 2) { done(); }
          });
        }
      });

      return <div/>;
    }

    const holder = ref<any>();
    renderer.render(<div _ref={holder}><MyComp/></div>).on(livelyRoot());
    renderer.remove(holder.$);
  });

  it('should call dispose function when a dispose function is tracked instead of a callbag.', done => {
    const renderer = factory(() => new FunctionalComponentPlugin<N, R>(), () => new RefPlugin());

    function MyComp(this: TrackerComponentThis) {
      this.track(() => done());

      return <div/>;
    }

    const holder = ref<any>();
    renderer.render(<div _ref={holder}><MyComp/></div>).on(livelyRoot());
    renderer.remove(holder.$);
  });
}
