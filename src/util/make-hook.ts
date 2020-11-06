import { LifeCycleHook } from 'render-jsx';
import { DATA, END, Source, START } from 'callbag';

import { isData, isEnd, isStart } from '../types';

const _N = {};

export function makeHook<T>(source: Source<T>, op?: (value: T) => void): LifeCycleHook {
  let dispose: (() => void) | undefined = undefined;

  return {
    bind() {
      let last: T | typeof _N = _N;
      source(0, (t: START | DATA | END, d?: any) => {
        if (isStart(t)) {
          dispose = () => d(2);
        } else if (isData(t)) {
          if (op && d !== last) { op(last = d); }
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
