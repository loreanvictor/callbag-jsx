import { ComponentPostProcessor, ComponentProcessor, ComponentProvision } from 'render-jsx/component';
import { LiveRendererLike } from 'render-jsx';
import { Callbag } from 'callbag';
import { isCallbag } from '../types';
import { makeHook } from '../util';


type Trackable = Callbag<any, any> | (() => void);


export class CallbagTrackPlugin<Node>
  extends ComponentProcessor<Node, LiveRendererLike<Node>> {
  process(
    provide: (provision: ComponentProvision) => void,
    post: (processor: ComponentPostProcessor<Node>) => void,
  ): void {
    const tracked: Trackable[] = [];

    provide({
      track: (trackable: Trackable) => tracked.push(trackable)
    });

    post(node => {
      tracked.forEach(t => {
        if (isCallbag(t)) {
          this.renderer().hook(node, makeHook(t));
        } else {
          this.renderer().hook(node, { clear(){ (t as any)(); } });
        }
      });
    });
  }

  priority(): number {
    return ComponentProcessor.PriorityFallback;
  }
}


export interface TrackerComponentThis {
  track: (trackable: Trackable) => void;
}
