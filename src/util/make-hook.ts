import { LifeCycleHook } from 'render-jsx';
import { Source } from 'callbag';

import { makeSink } from './make-sink';
import { end, greetSource } from '../types';


export function makeHook<T>(source: Source<T>, op: (value: T) => void): LifeCycleHook {
  let dispose: (() => void) | undefined = undefined;

  return {
    bind() {
      greetSource(source, makeSink<T>({
        greet(talkback) { dispose = () => end(talkback); },
        receive(value) { op(value); },
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
