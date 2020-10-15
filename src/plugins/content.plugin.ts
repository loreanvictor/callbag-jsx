import { LiveRendererLike } from 'render-jsx';
import { ContentPlugin, Plugin } from 'render-jsx/plugin';

import { isCallbag } from '../types';
import { makeHook } from '../util';


export class CallbagContentPlugin<N> extends Plugin<N, LiveRendererLike<N>> implements ContentPlugin<N> {
  priority(): number {
    return Plugin.PriorityFallback;
  }

  setContent(node: N, target: any): boolean {
    if (isCallbag(target)) {
      const renderer = this.renderer();
      renderer.hook(node, makeHook(target, value => renderer.setContent(node, value)));

      return true;
    }

    return false;
  }
}
