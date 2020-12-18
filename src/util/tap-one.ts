/* istanbul ignore file */

import { Sink, Source } from 'callbag';
import { isData, isEnd, isStart, MsgType } from '../types';


export function tapOne<I>(
  src: Source<I> | Promise<I>,
  op: (i: I) => void,
): Source<I> {
  return (start: MsgType, sink: any) => {
    /* istanbul ignore next */
    if (!isStart(start)) {
      return;
    }

    if (src instanceof Promise) {
      let ended = false;

      sink(0, (t: MsgType, _?: any) => {
        if (ended) { return; }
        if (isEnd(t)) { ended = true; }
      });

      src.then(
        i => {
          if (ended) { return; }
          op(i); sink(2);
          ended = true;
        },
        err => {
          if (ended) { return; }
          sink(2, err);
          ended = true;
        }
      );
    } else {
      let talkback: Sink<I> | undefined;
      src(0, (t: MsgType, d?: any) => {
        if (isStart(t)) {
          talkback = d;
          sink(0, d);
        } else{
          if (talkback) {
            if (isData(t)) { op(d); }
            if (isEnd(t)) { sink(2, d); }
            else { sink(2); talkback(2); }
            talkback = undefined;
          }
        }
      });
    }
  };
}
