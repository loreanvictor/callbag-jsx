import { LiveDOMRenderer } from 'render-jsx/dom';
import { Plugin, PropPlugin } from 'render-jsx/plugin';
import { isCallbag } from '../types';


export class CallbagEventHandlerPlugin
  extends Plugin<Node, LiveDOMRenderer>
  implements PropPlugin<Node> {
  priority(): number {
    return Plugin.PriorityFallback + 1/100;
  }
  setProp(node: Node, prop: string, target: any): boolean {
    if (prop.startsWith('on') && isCallbag(target)) {
      node.addEventListener(prop.substr(2).toLowerCase(), event => target(1, event));
    }

    return false;
  }
}
