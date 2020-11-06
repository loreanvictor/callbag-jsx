import { DATA, END, Source, START } from 'callbag';
import { isData, isStart } from '../types';

const _N = {};

export function mapDistinct<I, O>(
  src: Source<I>,
  map: (i: I) => O,
): Source<O> & { get(): O | undefined } {
  let last: O | typeof _N = _N;

  const c = (start: START | DATA | END, sink: any) => {
    if (!isStart(start)) { return; }
    src(0, (t: START | DATA | END, d?: any) => {
      if (isData(t)) {
        const res = map(d);
        if (res !== last) {
          sink(1, last = res);
        }
      } else {
        sink(t, d);
      }
    });
  };

  c.get = () => last === _N ? undefined : last as O;

  return c;
}
