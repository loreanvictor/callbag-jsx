import { Sink } from 'callbag';
import { isData, isEnd, isStart, MsgType, Talkback } from '../types';


export function makeSink<T>(sink: {
  greet: (talkback: Talkback) => void,
  receive: (t: T) => void,
  terminate: (error: any) => void
}): Sink<T> {
  return (type: MsgType, msg?: any) => {
    if (isStart(type)) {
      sink.greet(msg);
    } else if (isData(type)) {
      sink.receive(msg);
    } else if (isEnd(type)) {
      sink.terminate(msg);
    }
  };
}

