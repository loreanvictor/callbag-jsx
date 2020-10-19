import { CommonDOMRenderer } from 'render-jsx/dom';
import {
  CallbagAppendPlugin,
  CallbagContentPlugin,
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
  );
}


export { TrackerComponentThis } from './plugins';
export { List } from './components';
