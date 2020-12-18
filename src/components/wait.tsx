import { Source } from 'callbag';
import { RendererLike } from 'render-jsx';
import { LiveDOMComponentThis } from 'render-jsx/dom';
import { scanRemove } from 'render-jsx/dom/util';

import { TrackerComponentThis } from '../plugins';
import { tapOne } from '../util/tap-one';


export interface WaitProps<T> {
  for: Source<T> | Promise<T>;
  then: (t: T) => Node;
  with?: () => Node;
}


export function Wait<T>(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: WaitProps<T>,
  renderer: RendererLike<Node>
) {
  const start = renderer.leaf();
  const end = renderer.leaf();
  this.setLifeCycleMarker(start);

  this.track(tapOne(props.for, i => {
    scanRemove(start, end, { remove: n => renderer.remove(n) });
    renderer.render(props.then(i)).after(start);
  })
  );

  return <>{start}{props.with ? props.with() : <></>}{end}</>;
}
