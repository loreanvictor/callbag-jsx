import { Callbag } from 'callbag';

import { greet, isData, isStart, MsgType } from '../types';


export function tap<T>(op: (t: T) => void): ((src: Callbag<never, T>) => Callbag<never, T>) {
  return src => (start: MsgType, sink?: any) => {
    if (!isStart(start)) { return; }
    greet(src, (t: MsgType, d?: any) => {
      if (isData(t)) { op(d); }
      sink(t, d);
    });
  };
}
