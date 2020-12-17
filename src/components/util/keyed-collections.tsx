
import { Addition, KeyFunc, ListChanges } from 'callbag-state-keyed';
import { LiveDOMRenderer } from 'render-jsx/dom';
import { scanRemove } from 'render-jsx/dom/util';


export type Shift = [from: number, to: number];

export function tr(i: number, shifts: Shift[]) {
  let res = i;
  for (let _i = 0, shift = shifts[_i]; _i < shifts.length; shift = shifts[++_i]) {
    res = res >= shift[0] ? res + shift[1] : res;
  }

  return res;
}


export function init<T>(
  entries: T[] | undefined, keyfunc: KeyFunc<T>, each: (key: string | number) => Node,
  markers: Node[], startMark: Node, renderer: LiveDOMRenderer) {
  const frag = <></>;
  for (
    let i = 0, _src = entries || [], entry = _src[i];
    i < _src.length;
    entry = _src[++i]
  ) {
    const key = keyfunc(entry);
    const node = each(key);
    renderer.render(node).on(frag);
    if (node.nodeType === node.DOCUMENT_FRAGMENT_NODE) {
      const marker = renderer.leaf();
      markers.push(marker);
      renderer.render(marker).on(frag);
    } else {
      markers.push(node);
    }
  }
  renderer.render(frag).after(startMark);
}


export function update<T>(
  changes: ListChanges<T>, keyfunc: KeyFunc<T>,
  each: (key: string | number) => Node,
  markers: Node[], startMark: Node, renderer: LiveDOMRenderer) {
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
      const key = keyfunc(a.item);
      add(a.index, [each(key)], false, markers, startMark, renderer, shifts);
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

    const nodes = del(move.oldIndex, markers, startMark, renderer, shifts, true);
    add(move.newIndex, nodes, true, markers, startMark, renderer, shifts);
  }

  if (appends.length > 0) {
    const frag = <></>;
    const start = markers[markers.length - 1];
    for (let i = 0, a = appends[i]; i < appends.length; a = appends[++i]) {
      const marker = renderer.leaf();
      markers.push(marker);
      const key = keyfunc(a.item);
      renderer.render(each(key)).on(frag);
      renderer.render(marker).on(frag);
    }

    renderer.render(frag).after(start);
  }
}


export function del(
  i: number, markers: Node[], startMark: Node,
  renderer: LiveDOMRenderer,
  shifts: Shift[], temp = false
) {
  const index = tr(i, shifts);
  const start = markers[index - 1] || startMark;
  const end = markers[index];
  const nodes = scanRemove(start, end, { includeEnd: true, remove: n => renderer.remove(n, temp) });
  markers.splice(index, 1);
  shifts.push([index, -1]);

  return nodes;
}

export function add(
  i: number, nodes: Node[], hasMarker: boolean,
  markers: Node[], startMark: Node, renderer: LiveDOMRenderer, shifts: Shift[]
) {
  const index = i;
  const start = markers[index - 1] || startMark;
  const marker = hasMarker ? nodes[nodes.length - 1] : renderer.leaf();
  if (nodes.length === 1 && hasMarker) {
    renderer.render(nodes[0]).after(start);
  } else {
    const frag = <></>;
    for (let _i = 0, node = nodes[_i]; _i < nodes.length; node = nodes[++_i]) {
      renderer.render(node).on(frag);
    }
    if (!hasMarker) { renderer.render(marker).on(frag); }
    renderer.render(frag).after(start);
  }

  markers.splice(index, 0, marker);
  shifts.push([index, +1]);
}
