import { Source } from 'callbag';
import { state, isState, SubState } from 'callbag-state';
import { keyed, isKeyedState, KeyedState, KeyFunc, ListChanges } from 'callbag-state-keyed';
import { LiveDOMComponentThis, LiveDOMRenderer } from 'render-jsx/dom';

import { TrackerComponentThis } from '../plugins';
import { scanRemove } from '../util/scan-remove';
import { tap } from '../util/tap';


export interface KeyedListProps<T> {
  of: Source<T[]>;
  each: (item: SubState<T[], number>, index: Source<number>) => Node;
  key?: KeyFunc<T>;
}


export function KeyedList<T>(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: KeyedListProps<T>,
  renderer: LiveDOMRenderer,
) {
  const markers: Node[] = [];
  const startMark = renderer.create('_marker');
  this.setLifeCycleMarker(startMark);

  let src = props.of as KeyedState<T>;
  if (!isKeyedState<T[]>(src)) {
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
    (src.get() || []).forEach((entry: any) => {
      const key = src.keyfunc(entry);
      const prevMarker = markers[markers.length - 1] || startMark;
      const marker = renderer.create('_marker');
      markers.push(marker);
      renderer.render(<>
        {props.each(src.key(key), src.index(key))}
        {marker}
      </>).after(prevMarker);
    });
  });

  this.track(tap((changes: ListChanges<T>) => {
    const shifts: [index: number, shift: number][] = [];
    const tr = (i: number) => shifts.reduce((_i, shift) => _i >= shift[0] ? _i + shift[1] : _i, i);

    const del = (i: number) => {
      const index = tr(i);
      const start = markers[index - 1] || startMark;
      const end = markers[index];
      const nodes = scanRemove(start, end, { includeEnd: true });
      markers.splice(index, 1);
      shifts.push([index, -1]);

      return nodes;
    };

    const add = (i: number, nodes: Node[], hasMarker = false) => {
      const index = i;
      const start = markers[index - 1] || startMark;
      const marker = hasMarker ? nodes[nodes.length - 1] : renderer.create('_marker');
      renderer.render(<>{nodes}{hasMarker ? '' : marker}</>).after(start);
      markers.splice(index, 0, marker);
      shifts.push([index, +1]);
    };

    changes.deletions.forEach(deletion => del(deletion.index));
    changes.additions.forEach(addition => {
      const key = src.keyfunc(addition.item);
      add(addition.index, [props.each(src.key(key), src.index(key))]);
    });

    changes.moves
    .filter(move => tr(move.oldIndex) !== move.newIndex)
    .sort((a, b) =>  Math.abs(tr(b.oldIndex) - b.newIndex) - Math.abs(tr(a.oldIndex) - a.newIndex))
    .forEach(move => {
      if (tr(move.oldIndex) === move.newIndex) { return; }

      console.log(move);

      const nodes = del(move.oldIndex);
      add(move.newIndex, nodes, true);
    });
  })(src.changes()));

  return <>{startMark}</>;
}
