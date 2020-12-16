import { Callbag, DATA, END, Sink, START } from 'callbag';
import { isEnd, isStart } from '../types';

const _N = {};

export function subject<T>(): Callbag<T, T> {
  const sinks: Sink<T>[] = [];
  let done = false;
  let last: T | typeof _N = _N;

  return (type: START | DATA | END, data?: any) => {
    if (done) { return; }

    if (isStart(type)) {
      const sink = data;
      sinks.push(sink);
      sink(0, (t: any) => {
        if (isEnd(t)) {
          const i = sinks.indexOf(sink);
          if (i > -1) { sinks.splice(i, 1); }
        }
      });
      if (last !== _N) { sink(1, last); }
    } else {
      const zinkz = sinks.slice(0);
      for (let i = 0, n = zinkz.length, sink; i < n; i++) {
        sink = zinkz[i];
        last = data;
        if (sinks.indexOf(sink) > -1) { sink(type as any, data); }
      }
      if (isEnd(type)) {
        done = true;
        sinks.length = 0;
      }
    }
  };
}
