import { LiveRendererLike } from 'render-jsx';
import { PropPlugin, Plugin } from 'render-jsx/plugin';

import { isCallbag } from '../types';
import { makeHook } from '../util';


export class CallbagPropPlugin<N> extends Plugin<N, LiveRendererLike<N>> implements PropPlugin<N> {
  priority(): number {
    return Plugin.PriorityFallback;
  }

  setProp(node: N, prop: string, target: any): boolean {
    if (isCallbag(target)) {
      const renderer = this.renderer();
      renderer.hook(node, makeHook(target, value => renderer.setProp(node, prop, value)));

      return true;
    }

    return false;
  }
}
