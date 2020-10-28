import { Source } from 'callbag';
import { state, isState, SubState } from 'callbag-state';
import { keyed, isKeyedState, KeyedState, KeyFunc, ListChanges, Addition } from 'callbag-state-keyed';
import { LiveDOMComponentThis, LiveDOMRenderer } from 'render-jsx/dom';
import { scanRemove } from 'render-jsx/dom/util';

import { TrackerComponentThis } from '../plugins';
import { tap } from '../util/tap';


interface KeyedListPropsWithKey<T> {
  of: Source<T[]>;
  each: (item: SubState<T[], number>, index: Source<number>) => Node;
  key: KeyFunc<T>;
}

interface KeyedListPropsWithoutKey<T> {
  of: KeyedState<T>;
  each: (item: SubState<T[], number>, index: Source<number>) => Node;
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

  let src = props.of as KeyedState<T>;
  if (!isKeyedState<T[]>(src)) {
    if (!isWithKeys(props)) { throw Error('You must provide a key function to KeyedList component.'); }
    if (isState<T[]>(src)) {
      src = keyed(src as any, props.key!!);
    } else {
      const st = state<T[]>([]);
      src = keyed(st as any, props.key!!);
      this.track(tap((v: T[]) => st.set(v))(st));
    }
  }

  this.track(src);

  this.onBind(() => {
    const frag = <></>;
    (src.get() || []).forEach((entry: any) => {
      const key = src.keyfunc(entry);
      const marker = renderer.leaf();
      markers.push(marker);
      renderer.render(props.each(src.key(key), src.index(key))).on(frag);
      renderer.render(marker).on(frag);
    });
    renderer.render(frag).after(startMark);
  });

  this.track(tap((changes: ListChanges<T>) => {
    const shifts: [index: number, shift: number][] = [];
    const tr = (i: number) => shifts.reduce((_i, shift) => _i >= shift[0] ? _i + shift[1] : _i, i);

    const del = (i: number) => {
      const index = tr(i);
      const start = markers[index - 1] || startMark;
      const end = markers[index];
      const nodes = scanRemove(start, end, { includeEnd: true, remove: n => renderer.remove(n) });
      markers.splice(index, 1);
      shifts.push([index, -1]);

      return nodes;
    };

    const add = (i: number, nodes: Node[], hasMarker = false) => {
      const index = i;
      const start = markers[index - 1] || startMark;
      const marker = hasMarker ? nodes[nodes.length - 1] : renderer.leaf();
      const frag = <></>;
      nodes.forEach(node => renderer.render(node).on(frag));
      if (!hasMarker) { renderer.render(marker).on(frag); }
      renderer.render(frag).after(start);
      markers.splice(index, 0, marker);
      shifts.push([index, +1]);
    };

    const appends: Addition<T>[] = [];
    changes.deletions.forEach(deletion => del(deletion.index));
    changes.additions.forEach(addition => {
      if (tr(addition.index) > markers.length) {
        appends.push(addition);
      } else {
        const key = src.keyfunc(addition.item);
        add(addition.index, [props.each(src.key(key), src.index(key))]);
      }
    });

    changes.moves
    .filter(move => tr(move.oldIndex) !== move.newIndex)
    .sort((a, b) =>  Math.abs(tr(b.oldIndex) - b.newIndex) - Math.abs(tr(a.oldIndex) - a.newIndex))
    .forEach(move => {
      if (tr(move.oldIndex) === move.newIndex) { return; }

      const nodes = del(move.oldIndex);
      add(move.newIndex, nodes, true);
    });

    if (appends.length > 0) {
      const frag = <></>;
      const start = markers[markers.length - 1];
      appends.forEach(append => {
        const marker = renderer.leaf();
        markers.push(marker);
        const key = src.keyfunc(append.item);
        renderer.render(props.each(src.key(key), src.index(key))).on(frag);
        renderer.render(marker).on(frag);
      });

      renderer.render(frag).after(start);
    }
  })(src.changes()));

  return <>{startMark}</>;
}
