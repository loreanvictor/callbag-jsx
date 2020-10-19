import { Callbag } from 'callbag';
import { LiveDOMRenderer, LiveDOMComponentThis } from 'render-jsx/dom';
import { state, State, isState } from 'callbag-state';
import { TrackerComponentThis } from '../plugins';
import { tap } from '../util/tap';
import { scanRemove } from '../util/scan-remove';


export interface SimpleListProps {
  of: Callbag<any, any[]>;
  each: (item: State<any>) => Node;
}

export function SimpleList(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: SimpleListProps,
  renderer: LiveDOMRenderer,
) {
  const markers: Node[] = [];
  const startMark = renderer.create('_marker');
  this.setLifeCycleMarker(startMark);

  let src = props.of as State<any[]>;
  if (!isState(props.of)) {
    src = state<any[]>([]);
    this.track(tap((v: any[]) => src.set(v))(props.of));
  }

  this.track(src);
  this.track(tap((l: any[]) => {
    if (l.length > markers.length) {
      let prevMark = markers[markers.length - 1] || startMark;

      for (let index = markers.length; index < l.length; index++) {
        const marker = renderer.create('_marker');
        renderer.render(<>{props.each(src.sub(index))}{marker}</>).after(prevMark);
        prevMark = marker;
        markers.push(marker);
      }
    } else if (l.length < markers.length) {
      const prevMark = markers[l.length - 1] || startMark;

      for (let index = l.length; index < markers.length; index++) {
        scanRemove(prevMark, markers[index], {
          includeEnd: true
        });
      }

      markers.length = l.length;
    }
  })(src));

  return <>{startMark}</>;
}
