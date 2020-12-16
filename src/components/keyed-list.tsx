import { Source } from 'callbag';
import { StateLike, SubState } from 'callbag-state';
import { keyed, isKeyedState, KeyedState, KeyFunc, ListChanges } from 'callbag-state-keyed';
import { LiveDOMComponentThis, LiveDOMRenderer } from 'render-jsx/dom';

import { TrackerComponentThis } from '../plugins';
import { tap } from '../util/tap';
import { ensureState } from './util/ensure-state';
import { init, update } from './util/keyed-collections';


interface KeyedListPropsWithKey<T> {
  of: StateLike<T[]> | Source<T[]>;
  each: (item: SubState<T[], number>, index: Source<number> & { get(): number | undefined }) => Node;
  key: KeyFunc<T>;
}

interface KeyedListPropsWithoutKey<T> {
  of: KeyedState<T>;
  each: (item: SubState<T[], number>, index: Source<number> & { get(): number | undefined }) => Node;
}

export type KeyedListProps<T> = KeyedListPropsWithKey<T> | KeyedListPropsWithoutKey<T>;

function isWithKeys<T>(props: KeyedListProps<T>): props is KeyedListPropsWithKey<T> {
  return (props as any).key && typeof (props as any).key === 'function';
}

export function KeyedList<T>(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: KeyedListProps<T>,
  renderer: LiveDOMRenderer,
) {
  const markers: Node[] = [];
  const startMark = renderer.leaf();
  this.setLifeCycleMarker(startMark);

  const src = isKeyedState<T>(props.of) ? props.of : (
    isWithKeys(props)
      ? keyed(ensureState(props.of, cb => this.track(cb)), props.key!)
      : (() => { throw Error('You must provide a key function for KeyedList component.'); })()
  );

  this.track(src);

  this.onBind(() => {
    init(src.get(), src.keyfunc,
      key => props.each(src.key(key), src.index(key)),
      markers, startMark, renderer);
  });

  this.track(tap((changes: ListChanges<T>) => {
    update(changes, src.keyfunc, key => props.each(src.key(key), src.index(key)), markers, startMark, renderer);
  })(src.changes()));

  return <>{startMark}</>;
}
