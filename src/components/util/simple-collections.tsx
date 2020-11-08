import { LiveDOMRenderer } from 'render-jsx/dom';
import { scanRemove } from 'render-jsx/dom/util';

export function update<T>(
  l: T[],
  each: (index: number) => Node,
  markers: Node[], startMark: Node, renderer: LiveDOMRenderer,
) {
  if (l.length > markers.length) {
    const start = markers[markers.length - 1] || startMark;
    const frag = <></>;

    for (let index = markers.length; index < l.length; index++) {
      const node = each(index);
      renderer.render(node).on(frag);
      if (node instanceof DocumentFragment) {
        const marker = renderer.leaf();
        renderer.render(marker).on(frag);
        markers.push(marker);
      } else {
        markers.push(node);
      }
    }

    renderer.render(frag).after(start);
  } else if (l.length < markers.length) {
    const prevMark = markers[l.length - 1] || startMark;

    for (let index = l.length; index < markers.length; index++) {
      scanRemove(prevMark, markers[index], {
        includeEnd: true,
        remove: n => renderer.remove(n)
      });
    }

    markers.length = l.length;
  }
}
