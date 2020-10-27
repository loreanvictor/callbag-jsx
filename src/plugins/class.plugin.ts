import { LiveDOMRenderer } from 'render-jsx/dom';
import { Plugin } from 'render-jsx/plugin';
import { AddClassPlugin, ToggleClassPlugin } from 'render-jsx/dom/plugins';

import { isCallbag } from '../types';
import { makeHook } from '../util';


export class CallbagClassPlugin
  extends Plugin<Node, LiveDOMRenderer>
  implements AddClassPlugin<LiveDOMRenderer>, ToggleClassPlugin<LiveDOMRenderer> {

  priority(): number {
    return Plugin.PriorityFallback;
  }

  addClass(node: Node, target: any, _switch: (value: string) => void): boolean {
    if (isCallbag(target)) {
      this.renderer().hook(node, makeHook(target, v => _switch(`${v}`)));

      return true;
    }

    return false;
  }

  addClassToggle(node: HTMLElement, _: string, target: any, toggle: (v: boolean) => void): boolean {
    if (isCallbag(target)) {
      this.renderer().hook(node, makeHook(target, v => toggle(!!v)));

      return true;
    }

    return false;
  }
}
