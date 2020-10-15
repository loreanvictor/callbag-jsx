import { Source, Sink } from 'callbag';
import { end, greetSink, isData, isEnd, isStart, MsgType, relay, send } from './types';


export type State<T> = Source<T> & Sink<T> & {
  get(): T;
  set(t: T): void;
  clear(): void;
};


export function makeState<T>(initial: T): State<T> {
  let value = initial;
  const sinks: Sink<T>[] = [];

  const state: State<T> = (type: MsgType, msg?:  any) => {
    if (isStart(type)) {
      const sink = msg as Sink<T>;
      sinks.push(sink);

      greetSink(sink, req => {
        if (isEnd(req)) {
          const index = sinks.indexOf(sink);
          if (index >= 0) {
            sinks.splice(index, 1);
          }
        }
      });
      send(sink, value);
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
    }
  };

  state.get = () => value;
  state.set = (t: T) => send(state as Sink<T>, t);
  state.clear = () => end(state);

  return state;
}
