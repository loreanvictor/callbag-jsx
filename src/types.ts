import { START, DATA, END, Callbag, Sink, Source } from 'callbag';

export type MsgType = START | DATA | END;
export type Talkback = (type: END, error?: any) => void;

export function isCallbag<I, O>(f: any): f is Callbag<I, O> {
  return typeof f === 'function' && f.length === 2;
}

export function greet<T>(source: Source<T>, sink: Sink<T>): void;
export function greet<T>(sink: Sink<T>, talkback: Talkback): void;
export function greet<T>(cb: Source<T> | Sink<T> | Callbag<T, T>, back: Sink<T> | Talkback) { cb(0, back as any); }
export function deliver<T>(sink: Sink<T>, value: T) { sink(1, value); }
export function relay<T>(sink: Sink<T>, type: DATA | END, value: any) { sink(type as any, value); }
export function terminate<I, O>(callbag: Callbag<I, O> | Talkback, error?: any) { callbag(2, error); }

export function isStart(msg: MsgType): msg is START { return msg === 0; }
export function isData(msg: MsgType): msg is DATA { return msg === 1; }
export function isEnd(msg: MsgType): msg is END { return msg === 2; }
