import { DATA, END, Source, START } from 'callbag';
import { isData, isStart } from '../types';

const _N = {};

export function mapDistinct<I, O>(
  src: Source<I>,
  map: (i: I) => O,
  initial?: I,
): Source<O> & { get(): O | undefined } {
  let last: O | typeof _N = _N;
  if (initial) {
    last = map(initial);
  }

  const c = (start: START | DATA | END, sink: any) => {
    let _last: O | typeof _N = last;
    /* istanbul ignore next */
    if (!isStart(start)) { return; }
    src(0, (t: START | DATA | END, d?: any) => {
      if (isData(t)) {
        const res = map(d);
        if (res !== _last) {
          sink(1, last = _last = res);
        }
      } else {
        sink(t, d);
      }
    });
    if (last !== _N) { sink(1, last); }
  };

  c.get = () => last === _N ? undefined : last as O;

  return c;
}
