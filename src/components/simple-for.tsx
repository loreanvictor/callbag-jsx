import { Source } from 'callbag';
import { LiveDOMComponentThis, LiveDOMRenderer } from 'render-jsx/dom';
import { TrackerComponentThis } from '../plugins';
import { mapDistinct } from '../util/map-distinct';
import { tap } from '../util/tap';
import { update } from './util/simple-collections';


export interface SimpleForProps<T> {
  of: Source<T[]>;
  each: (item: Source<T> & { get(): T | undefined }, index: number) => Node;
}


export function SimpleFor<T>(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: SimpleForProps<T>,
  renderer: LiveDOMRenderer,
) {
  const markers: Node[] = [];
  const startMark = renderer.leaf();
  this.setLifeCycleMarker(startMark);

  this.track(props.of);
  this.track(tap((l: T[]) => {
    update(l, index => props.each(mapDistinct(props.of, _l => _l[index]), index), markers, startMark, renderer);
  })(props.of));

  return <>{startMark}</>;
}
