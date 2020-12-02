import { LiveDOMRenderer, LiveDOMComponentThis } from 'render-jsx/dom';
import { StateLike } from 'callbag-state';
import { TrackerComponentThis } from '../plugins';
import { tap } from '../util/tap';
import { SubState } from 'callbag-state/dist/es6/types';
import { update } from './util/simple-collections';
import { Source } from 'callbag';
import { ensureState } from './util/ensure-state';


export interface SimpleListProps<T>{
  of: StateLike<T[]> | Source<T[]>;
  each: (item: SubState<T[], number>, index: number) => Node;
}

export function SimpleList<T>(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: SimpleListProps<T>,
  renderer: LiveDOMRenderer,
) {
  const markers: Node[] = [];
  const startMark = renderer.leaf();
  this.setLifeCycleMarker(startMark);

  const src = ensureState(props.of, cb => this.track(cb));

  this.track(src);
  this.track(tap((l: T[] | undefined) => {
    update(l || [], index => props.each(src.sub(index), index), markers, startMark, renderer);
  })(src));

  return <>{startMark}</>;
}
