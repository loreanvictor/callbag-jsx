import { LiveDOMRenderer } from 'render-jsx/dom';
import { SetStylePlugin } from 'render-jsx/dom/plugins';
import { Plugin } from 'render-jsx/plugin';

import { isCallbag } from '../types';
import { makeHook } from '../util';


export class CallbagStylePlugin
  extends Plugin<Node, LiveDOMRenderer>
  implements SetStylePlugin<LiveDOMRenderer> {
  priority(): number {
    return Plugin.PriorityFallback;
  }
  setStyle(node: HTMLElement, _: string, target: any, set: (value: string | object) => void): boolean {
    if (isCallbag(target)) {
      this.renderer().hook(node, makeHook(target, v => set(v as any)));

      return true;
    }

    return false;
  }
}
