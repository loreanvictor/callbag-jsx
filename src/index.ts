import { CommonDOMRenderer, LiveDOMRenderer } from 'render-jsx/dom';
import {
  CallbagAppendPlugin,
  CallbagContentPlugin,
  CallbagEventHandlerPlugin,
  CallbagInputStatePlugin,
  CallbagPropPlugin,
  CallbagTrackPlugin
} from './plugins';



export function makeRenderer() {
  return new CommonDOMRenderer().plug(
    () => new CallbagAppendPlugin<Node>(),
    () => new CallbagPropPlugin<Node>(),
    () => new CallbagContentPlugin<Node>(),
    () => new CallbagTrackPlugin<Node>(),
    () => new CallbagInputStatePlugin(),
    () => new CallbagEventHandlerPlugin(),
  ) as LiveDOMRenderer;
}


export { TrackerComponentThis } from './plugins';
export { List } from './components';
