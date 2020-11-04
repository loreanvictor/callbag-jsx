import { Source } from 'callbag';
import { state, isState, SubState } from 'callbag-state';
import { keyed, isKeyedState, KeyedState, KeyFunc, ListChanges, Addition } from 'callbag-state-keyed';
import { LiveDOMComponentThis, LiveDOMRenderer } from 'render-jsx/dom';
import { scanRemove } from 'render-jsx/dom/util';

import { TrackerComponentThis } from '../plugins';
import { tap } from '../util/tap';


interface KeyedListPropsWithKey<T> {
  of: Source<T[]>;
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


type Shift = [from: number, to: number];
function tr(i: number, shifts: Shift[]) {
  let res = i;
  for (let _i = 0, shift = shifts[_i]; _i < shifts.length; shift = shifts[++_i]) {
    res = res >= shift[0] ? res + shift[1] : res;
  }

  return res;
}

function del(i: number, markers: Node[], startMark: Node, renderer: LiveDOMRenderer, shifts: Shift[]) {
  const index = tr(i, shifts);
  const start = markers[index - 1] || startMark;
  const end = markers[index];
  const nodes = scanRemove(start, end, { includeEnd: true, remove: n => renderer.remove(n) });
  markers.splice(index, 1);
  shifts.push([index, -1]);

  return nodes;
}

function add(
  i: number, nodes: Node[], hasMarker: boolean,
  markers: Node[], startMark: Node, renderer: LiveDOMRenderer, shifts: Shift[]
) {
  const index = i;
  const start = markers[index - 1] || startMark;
  const marker = hasMarker ? nodes[nodes.length - 1] : renderer.leaf();
  const frag = <></>;
  for (let _i = 0, node = nodes[_i]; _i < nodes.length; node = nodes[++_i]) {
    renderer.render(node).on(frag);
  }
  if (!hasMarker) { renderer.render(marker).on(frag); }
  renderer.render(frag).after(start);
  markers.splice(index, 0, marker);
  shifts.push([index, +1]);
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
    for (
      let i = 0, _src = src.get() || [], entry = _src[i];
      i < _src.length;
      entry = _src[++i]
    ) {
      const key = src.keyfunc(entry);
      const marker = renderer.leaf();
      markers.push(marker);
      renderer.render(props.each(src.key(key), src.index(key))).on(frag);
      renderer.render(marker).on(frag);
    }
    renderer.render(frag).after(startMark);
  });

  this.track(tap((changes: ListChanges<T>) => {
    if (!renderer.document.contains(startMark)) {
      return;
    }

    const shifts: Shift[] = [];

    const appends: Addition<T>[] = [];
    for (let i = 0, d = changes.deletions[i]; i < changes.deletions.length; d = changes.deletions[++i]) {
      del(d.index, markers, startMark, renderer, shifts);
    }

    for (let i = 0, a = changes.additions[i]; i < changes.additions.length; a = changes.additions[++i]) {
      if (tr(a.index, shifts) > markers.length) {
        appends.push(a);
      } else {
        const key = src.keyfunc(a.item);
        add(a.index, [props.each(src.key(key), src.index(key))], false, markers, startMark, renderer, shifts);
      }
    }

    let moves = [];
    for (let i = 0, m = changes.moves[i]; i < changes.moves.length; m = changes.moves[++i]) {
      if (tr(m.oldIndex, shifts) !== m.newIndex) {
        moves.push(m);
      }
    }
    moves = moves.sort((a, b) =>
      Math.abs(tr(b.oldIndex, shifts) - b.newIndex) - Math.abs(tr(a.oldIndex, shifts) - a.newIndex));
    for (let i = 0, move = moves[i]; i < moves.length; move = moves[++i]) {
      if (tr(move.oldIndex, shifts) === move.newIndex) { continue; }

      const nodes = del(move.oldIndex, markers, startMark, renderer, shifts);
      add(move.newIndex, nodes, true, markers, startMark, renderer, shifts);
    }

    if (appends.length > 0) {
      const frag = <></>;
      const start = markers[markers.length - 1];
      for (let i = 0, a = appends[i]; i < appends.length; a = appends[++i]) {
        const marker = renderer.leaf();
        markers.push(marker);
        const key = src.keyfunc(a.item);
        renderer.render(props.each(src.key(key), src.index(key))).on(frag);
        renderer.render(marker).on(frag);
      }

      renderer.render(frag).after(start);
    }
  })(src.changes()));

  return <>{startMark}</>;
}
