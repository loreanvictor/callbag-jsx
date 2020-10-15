import { Source, Sink } from 'callbag';
import { terminate, greet, isData, isEnd, isStart, MsgType, relay, deliver } from './types';


export type State<T> = Source<T> & Sink<T> & {
  get(): T;
  set(t: T): void;
  clear(): void;
};


export function makeState<T>(initial: T): State<T> {
  let value = initial;
  let done = false;
  const sinks: Sink<T>[] = [];

  const state: State<T> = (type: MsgType, msg?:  any) => {
    if (done) {
      return;
    }

    if (isStart(type)) {
      const sink = msg as Sink<T>;
      sinks.push(sink);

      greet(sink, req => {
        if (isEnd(req)) {
          const index = sinks.indexOf(sink);
          if (index >= 0) {
            sinks.splice(index, 1);
          }
        }
      });
      deliver(sink, value);
    } else {
      if (isData(type)) {
        value = msg;
      }

      const _sinks = [...sinks];
      _sinks.forEach(sink => {
        if (sinks.indexOf(sink) >= 0) {
          relay(sink, type, msg);
        }
      });

      if (isEnd(type)) {
        done = true;
        sinks.length = 0;
      }
    }
  };

  state.get = () => value;
  state.set = (t: T) => deliver(state as Sink<T>, t);
  state.clear = () => terminate(state);

  return state;
}
