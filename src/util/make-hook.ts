import { LifeCycleHook } from 'render-jsx';
import { DATA, END, Source, START } from 'callbag';

import { isData, isEnd, isStart } from '../types';


export function makeHook<T>(source: Source<T>, op?: (value: T) => void): LifeCycleHook {
  let dispose: (() => void) | undefined = undefined;

  return {
    bind() {
      source(0, (t: START | DATA | END, d?: any) => {
        if (isStart(t)) {
          dispose = () => d(2);
        } else if (isData(t)) {
          if (op) { op(d); }
        } else if (isEnd(t)) {
          dispose = undefined;
        }
      });
    },
    clear() {
      if (dispose) {
        dispose();
      }
    }
  };
}
