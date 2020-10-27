import { Source } from 'callbag';
import { LiveDOMRenderer, LiveDOMComponentThis } from 'render-jsx/dom';
import { state, State, isState } from 'callbag-state';
import { TrackerComponentThis } from '../plugins';
import { tap } from '../util/tap';
import { SubState } from 'callbag-state/dist/es6/types';
import { scanRemove } from 'render-jsx/dom/util';


export interface SimpleListProps<T>{
  of: Source<T[]>;
  each: (item: SubState<T[], number>) => Node;
}

export function SimpleList<T>(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: SimpleListProps<T>,
  renderer: LiveDOMRenderer,
) {
  const markers: Node[] = [];
  const startMark = renderer.create('_marker');
  this.setLifeCycleMarker(startMark);

  let src = props.of as State<T[]>;
  if (!isState(props.of)) {
    src = state<T[]>([]);
    this.track(tap((v: T[]) => src.set(v))(props.of));
  }

  this.track(src);
  this.track(tap((l: T[]) => {
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
