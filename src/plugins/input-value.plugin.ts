import { LiveDOMRenderer } from 'render-jsx/dom';
import { setInputValue } from 'render-jsx/dom/util';
import { PropPlugin, Plugin } from 'render-jsx/plugin';

import { isCallbag } from '../types';
import { makeHook } from '../util';


export class CallbagInputValuePlugin extends Plugin<Node, LiveDOMRenderer> implements PropPlugin<Node> {
  priority(): number {
    return Plugin.PriorityFallback + 1/100;
  }

  setProp(node: Node, prop: string, target: any): boolean {
    if (prop === 'value'
    && (
      node.nodeName === 'INPUT'
      || node.nodeName === 'TEXTAREA'
      || node.nodeName === 'SELECT'
    )
    && isCallbag(target)
  ) {
      const renderer = this.renderer();
      renderer.hook(node, makeHook(target, v => setInputValue(node as any, v)));

      return true;
    }

    return false;
  }
}
