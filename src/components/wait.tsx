import { Source } from 'callbag';
import state, { State } from 'callbag-state';
import { RendererLike } from 'render-jsx';
import { LiveDOMComponentThis } from 'render-jsx/dom';
import { scanRemove } from 'render-jsx/dom/util';

import { TrackerComponentThis } from '../plugins';
import { tapOne } from '../util/tap-one';


export interface WaitPropsSequentially<T> {
  for: Source<T> | Promise<T>;
  then: (t: T) => Node;
  with?: () => Node;
}

export interface WaitPropsConcurrently<T> {
  for: Source<T> | Promise<T>;
  then: (t: State<T>) => Node;
  with?: () => Node;
  concurrently: true;
}

export type WaitProps<T> = WaitPropsSequentially<T> | WaitPropsConcurrently<T>;

function isConcurrently<T>(props: WaitProps<T>): props is WaitPropsConcurrently<T> {
  return (props as any).concurrently === true;
}

export function Wait<T>(props: WaitPropsSequentially<T>, renderer: RendererLike<Node>): Node;
export function Wait<T>(props: WaitPropsConcurrently<T>, renderer: RendererLike<Node>): Node;
export function Wait<T>(
  this: TrackerComponentThis & LiveDOMComponentThis,
  props: WaitProps<T>,
  renderer: RendererLike<Node>
) {
  const start = renderer.leaf();
  const end = renderer.leaf();
  this.setLifeCycleMarker(start);

  if (isConcurrently(props)) {
    const data = state<T>(undefined as any);
    const node = props.then(data);

    this.track(
      tapOne(props.for, i => {
        scanRemove(start, end, { remove: n => renderer.remove(n) });
        renderer.render(node).after(start);
        data.set(i);
      })
    );
  } else {
    this.track(
      tapOne(props.for, i => {
        scanRemove(start, end, { remove: n => renderer.remove(n) });
        renderer.render(props.then(i)).after(start);
      })
    );
  }

  return <>{start}{props.with ? props.with() : <></>}{end}</>;
}
