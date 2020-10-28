import { Source } from 'callbag';
import { LiveDOMComponentThis, LiveDOMRenderer } from 'render-jsx/dom';
import { scanRemove } from 'render-jsx/dom/util';

import { TrackerComponentThis } from '../plugins';
import { tap } from '../util/tap';


export interface ConditionalProps {
  if: Source<boolean>;
  then: () => Node;
  else?: () => Node;
}


export function Conditional(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: ConditionalProps,
  renderer: LiveDOMRenderer,
) {
  const start = renderer.leaf();
  const end = renderer.leaf();
  let last: boolean | undefined = undefined;

  this.track(tap((v: boolean) => {
    if (v === last) { return; }
    last = v;
    if (v) {
      scanRemove(start, end, { remove: n => renderer.remove(n) });
      renderer.render(props.then()).after(start);
    } else {
      scanRemove(start, end, { remove: n => renderer.remove(n) });
      if (props.else) {
        renderer.render(props.else()).after(start);
      }
    }
  })(props.if));

  return <>{start}{end}</>;
}
