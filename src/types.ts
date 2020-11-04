import { START, DATA, END, Callbag, Sink, Source } from 'callbag';

export type MsgType = START | DATA | END;
export type Talkback = (type: END, error?: any) => void;

export function isCallbag<I, O>(f: any): f is Callbag<I, O> {
  return typeof f === 'function' && f.length === 2;
}

export function isStart(msg: MsgType): msg is START { return msg === 0; }
export function isData(msg: MsgType): msg is DATA { return msg === 1; }
export function isEnd(msg: MsgType): msg is END { return msg === 2; }
