export * from './state';

import { CommonDOMRenderer } from 'render-jsx/dom';

import { CallbagAppendPlugin } from './plugins/append.plugin';
import { CallbagContentPlugin } from './plugins/content.plugin';
import { CallbagPropPlugin } from './plugins/prop.plugin';


export function makeRenderer() {
  return new CommonDOMRenderer().plug(
    () => new CallbagAppendPlugin<Node>(),
    () => new CallbagPropPlugin<Node>(),
    () => new CallbagContentPlugin<Node>(),
  );
}
