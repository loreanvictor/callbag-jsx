import { LiveRendererLike } from 'render-jsx';
import { AppendPlugin, Plugin } from 'render-jsx/plugin';

import { isCallbag } from '../types';
import { makeHook } from '../util';

import { log } from '../util/log';

export class CallbagAppendPlugin<N> extends Plugin<N, LiveRendererLike<N>> implements AppendPlugin<N> {
  priority(): number {
    return Plugin.PriorityFallback;
  }

  append(target: any, host: N): boolean {
    if (isCallbag(target)) {
      const renderer = this.renderer();
      const leaf = renderer.leaf();

      renderer.hook(leaf, makeHook(target, value => {
        log('C');
        renderer.setContent(leaf, value);
        log('D');
      }));
      renderer.append(leaf, host);

      return true;
    }

    return false;
  }
}
