import { LiveDOMRenderer, LiveDOMComponentThis } from 'render-jsx/dom';
import { StateLike } from 'callbag-state';
import { TrackerComponentThis } from '../plugins';
import { tap } from '../util/tap';
import { SubState } from 'callbag-state/dist/es6/types';
import { update } from './util/simple-collections';


export interface SimpleListProps<T>{
  of: StateLike<T[]>;
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

  this.track(props.of);
  this.track(tap((l: T[]) => {
    update(l, index => props.each(props.of.sub(index), index), markers, startMark, renderer);
  })(props.of));

  return <>{startMark}</>;
}
