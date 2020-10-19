import { LifeCycleHook } from 'render-jsx';
import { Source } from 'callbag';

import { makeSink } from './make-sink';
import { terminate, greet } from '../types';


export function makeHook<T>(source: Source<T>, op?: (value: T) => void): LifeCycleHook {
  let dispose: (() => void) | undefined = undefined;

  return {
    bind() {
      greet(source, makeSink<T>({
        greet(talkback) { dispose = () => terminate(talkback); },
        receive(value) { if (op) { op(value); } },
        terminate() { dispose = undefined; }
      }));
    },
    clear() {
      if (dispose) {
        dispose();
      }
    }
  };
}
