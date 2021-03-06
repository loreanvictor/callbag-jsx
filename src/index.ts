import { DOMWindow } from 'jsdom';
import { CommonDOMRenderer, LiveDOMRenderer } from 'render-jsx/dom';
import {
  CallbagAppendPlugin,
  CallbagClassPlugin,
  CallbagStylePlugin,
  CallbagContentPlugin,
  CallbagEventHandlerPlugin,
  CallbagInputStatePlugin,
  CallbagInputValuePlugin,
  CallbagPropPlugin,
  CallbagTrackPlugin
} from './plugins';



export function makeRenderer(dom?: DOMWindow) {
  return new CommonDOMRenderer(dom).plug(
    () => new CallbagAppendPlugin<Node>(),
    () => new CallbagPropPlugin<Node>(),
    () => new CallbagContentPlugin<Node>(),
    () => new CallbagTrackPlugin<Node>(),
    () => new CallbagInputValuePlugin(),
    () => new CallbagInputStatePlugin(),
    () => new CallbagEventHandlerPlugin(),
    () => new CallbagClassPlugin(),
    () => new CallbagStylePlugin(),
  ) as LiveDOMRenderer;
}


export { TrackerComponentThis } from './plugins';
export { For, List, Conditional, Wait } from './components';
