import { Source } from 'callbag';
import { KeyFunc, Watcher } from 'callbag-state-keyed';
import { KeyMap } from 'callbag-state-keyed/dist/es6/types';
import { LiveDOMComponentThis, LiveDOMRenderer } from 'render-jsx/dom';

import { TrackerComponentThis } from '../plugins';
import { mapDistinct } from '../util/map-distinct';
import { subject } from '../util/subject';
import { tap } from '../util/tap';
import { update } from './util/keyed-collections';


export interface KeyedForProps<T> {
  of: Source<T[]>;
  each: (item: Source<T> & { get(): T | undefined }, index: Source<number> & { get(): number | undefined }) => Node;
  key: KeyFunc<T>;
}

export function KeyedFor<T>(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: KeyedForProps<T>,
  renderer: LiveDOMRenderer,
) {
  const markers: Node[] = [];
  const startMark = renderer.leaf();
  this.setLifeCycleMarker(startMark);
  const watcher = new Watcher<T>([], props.key);
  const sub = subject<KeyMap<T>>();

  this.track(tap((l: T[]) => {
    const changes = watcher.changes(l);
    update(changes, props.key,
      key => props.each(
        mapDistinct(sub, m => m[key]?.item),
        mapDistinct(sub, m => m[key]?.index),
      ),
    markers, startMark, renderer);
    sub(1, watcher.keymap);
  })(props.of));

  return <>{startMark}</>;
}
